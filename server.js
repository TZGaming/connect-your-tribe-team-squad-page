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
      'sort': '-created',
      'limit': 15
    });

    const [personRes, messageRes] = await Promise.all([
      fetch(`${API_URL}/person?${personParams.toString()}`),
      fetch(`${API_URL}/messages?${messageParams.toString()}`)
    ]);

    const personData = await personRes.json();
    const messageData = await messageRes.json();

    // // console.log test voor issue
    // console.log('Log bericht', messageData);

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

// ------------------------------------------------
//  Routes / filteren en sorteren 
// ------------------------------------------------

//sorteer naam op op az
app.get('/az', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam

  const params = {
    // Sorteer op naam
    'sort': 'name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad  
    // 'filter[squads][squad_id][name]': '1I',
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data})
})

// De squadleden op naam ordenenen , van z tot a 

app.get('/za', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam

  const params = {
    // Sorteer op naam
    'sort': '-name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad  
    // 'filter[squads][squad_id][name]': '1I',
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  
  response.render('index.liquid', {persons: personResponseJSON.data})
})

// Inladen en filteren op 1I
app.get('/squad-1j', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    // 'sort': '-name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad  
    // 'filter[squads][squad_id][name]': '1I',
    'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526',
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data})
})


 // Inladen en filteren op 1I
app.get('/squad-1I', async function (request, response) {

  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op naam
  const params = {
    // Sorteer op naam
    // 'sort': '-name',

    // Geef aan welke data je per persoon wil terugkrijgen
    'fields': '*,squads.*',

    // Combineer meerdere filters
    'filter[squads][squad_id][tribe][name]': 'FDND Jaar 1',
    // Filter eventueel alleen op een bepaalde squad  
    'filter[squads][squad_id][name]': '1I',
    // 'filter[squads][squad_id][name]': '1J',
    'filter[squads][squad_id][cohort]': '2526'
  }
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?' + new URLSearchParams(params))

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Toon eventueel alle data in de console
  // console.log(personResponseJSON)

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data})
})