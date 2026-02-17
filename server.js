import express from 'express'
import { Liquid } from 'liquidjs'

const teamName = 'Radiant' 
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const engine = new Liquid()
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('port', process.env.PORT || 8000)

const API_URL = 'https://fdnd.directus.app/items'

// ---------------------------------------------------------
// GET / : Haalt studenten en berichten op
// ---------------------------------------------------------
app.get('/', async function (request, response) {
  try {
    const personParams = new URLSearchParams({
      'fields': '*,squads.squad_id.name',
      'filter[squads][squad_id][cohort][_eq]': '2526',
      'filter[squads][squad_id][name][_in]': '1I,1J',
      'deep[squads][filter][squad_id][name][_in]': '1I,1J'
    });

    const messageParams = new URLSearchParams({
      'filter[for]': `Team ${teamName}`,
      'sort': '-date_created',
      'limit': 15
    });

    const [personRes, messageRes] = await Promise.all([
      fetch(`${API_URL}/person?${personParams.toString()}`),
      fetch(`${API_URL}/messages?${messageParams.toString()}`)
    ]);

    const personData = await personRes.json();
    const messageData = await messageRes.json();

    response.render('index.liquid', {
      persons: personData.data,
      messages: messageData.data,
      teamName: teamName
    });
  } catch (error) {
    response.status(500).send("API Fout");
  }
});

// ---------------------------------------------------------
// POST /berichten
// ---------------------------------------------------------
app.post('/', async function (request, response) {
  try {
    await fetch(`${API_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        for: `Team ${teamName}`,
        from: request.body.from,
        text: request.body.text
      }),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

    response.redirect(303, '/');
  } catch (error) {
    response.redirect(303, '/');
  }
});

// ---------------------------------------------------------
// GET /student/:id
// ---------------------------------------------------------
app.get('/student/:id', async function (request, response) {
  try {
    const personDetailRes = await fetch(`${API_URL}/person/${request.params.id}`);
    const personDetailData = await personDetailRes.json();
    
    response.render('student.liquid', {
      person: personDetailData.data
    });
  } catch (error) {
  }
});

app.listen(app.get('port'), () => {
  console.log(`Application started on http://localhost:${app.get('port')}`);
});