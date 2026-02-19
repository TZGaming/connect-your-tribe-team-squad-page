// Variabelen en elementen selecteren
let personCards = document.querySelectorAll('.person-card');
let chatContainer = document.querySelector('.chatContainer');
let closeChat = document.querySelector('.closeChat');
let openChatButton = document.querySelector('.openChat');
let sideBar = document.querySelector('.person-sidebar-container');
let iframeElement = document.getElementById('embed-iframe');

// https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
let spotifyIframeAPI; 
let spotifyPlayer;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    spotifyIframeAPI = IFrameAPI;
};

function loadUri(uri) {
    const container = document.getElementById('embed-iframe');
    
    if (!container) return;

    // Maak de container altijd helemaal leeg
    container.innerHTML = '';
    
    const hasValidUri = uri && uri !== 'null' && uri !== '';

    if (spotifyIframeAPI && hasValidUri) {
        container.style.display = 'block';

        // Maak een tijdelijk nieuw element aan waar Spotify de speler in zet
        const tempPlaceholder = document.createElement('div');
        container.appendChild(tempPlaceholder);

        const options = {
            width: '100%',
            height: '200',
            uri: uri
        };

        // Gebruik het tijdelijke element voor de controller
        spotifyIframeAPI.createController(tempPlaceholder, options, (EmbedController) => {
            spotifyPlayer = EmbedController;
        });
    } else {
        // Verberg de iframe als er geen spotify link is opgegeven
        container.style.display = 'none';
        spotifyPlayer = null;
    }
}

// Chat sluiten
closeChat.addEventListener('click', () => {
    chatContainer.classList.add('hide');
    openChatButton.classList.add('show');
});

// Chat openen
openChatButton.addEventListener('click', () => {
    chatContainer.classList.remove('hide');
    openChatButton.classList.remove('show');
});

// Automatisch contrastkleur bepalen voor tekst op basis van achtergrondkleur
function getContrastColor(hexcolor) {
    if (!hexcolor || hexcolor.length < 6) return 'white';

    // Kleur omzetten naar RGB
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);

    // Bereken helderheid van de kleur
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Lichte kleur = zwart, donkere kleur = wit
    return (yiq >= 128) ? 'black' : 'white';
}

// Kaarten animeren en sidebar triggeren
personCards.forEach((card, index) => {
    card.style.animationDelay = `${.25 + (index * 0.05)}s`;

    card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        const sidebarName = document.querySelector('.sidebar-name');
        const sidebarNickname = document.querySelector('.sidebar-nickname');
        const sidebarInfo = document.querySelector('.sidebar-basis-informatie');
        const bioElement = document.querySelector('.sidebar-bio');

        // Data unloaden uit de sidebar
        const resetSidebar = () => {
            sideBar.classList.remove('trigger-sidebar');
            personCards.forEach(c => c.classList.remove('active'));

            loadUri(null);

            // Maak de sidebar velden leeg na de transitie
            setTimeout(() => {
                sidebarName.textContent = "";
                sidebarNickname.textContent = "";
                sidebarNickname.style.display = "none";
                sidebarInfo.innerHTML = "";
                bioElement.innerHTML = "";
                document.querySelector('.sidebar-github').innerHTML = "";
                sideBar.style.backgroundColor = "";
                sideBar.style.outline = "none";
            }, 200);
        };

        // Als hij al actief was: unloaden en stoppen
        if (isActive) {
            resetSidebar();
            return;
        }

        // Reset card active state
        personCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Data ophalen
        const name = card.getAttribute('data-name');
        const squad = card.getAttribute('data-squad');
        const residency = card.getAttribute('data-residency');
        const color = card.getAttribute('data-color') || '#323232';
        const rawBio = card.getAttribute('data-bio');
        const nickname = card.getAttribute('data-nickname');
        const favTag = card.getAttribute('data-favTag');
        const birthdate = card.getAttribute('data-birthdate');
        const age = calculateAge(birthdate);
        const favProperty = card.getAttribute('data-favProperty');
        const team = card.getAttribute('data-team');
        const github = card.getAttribute('data-github');
        const favSong = card.getAttribute('data-favSong');

        // Contrast bepalen
        const contrastColor = getContrastColor(color);

        // Bio opschonen omdat sommige mensen vervelend zijn en divs in hun bio zetten die de de layout breken
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawBio;
        const divs = tempDiv.querySelectorAll('div');
        divs.forEach(div => {
            while (div.firstChild) {
                div.parentNode.insertBefore(div.firstChild, div);
            }
            div.parentNode.removeChild(div);
        });

        // Sidebar data invullen
        sidebarName.textContent = name;

        const hasHTML = /<[a-z][\s\S]*>/i.test(nickname);
        if (nickname && nickname !== "null" && !hasHTML) {
            sidebarNickname.textContent = `Ook bekend als ${nickname}.`;
            sidebarNickname.style.display = "block";
        } else {
            sidebarNickname.style.display = "none";
        }

        document.querySelector('.sidebar-basis-informatie').textContent = `Member van team ${team}, ${age} jaar oud. Deze persoon zit in Squad ${squad} en woont in ${residency || 'niemandsland'}. Hij/zij houdt ervan om de ${favTag} tag te gebruiken in HTML en is lekker in CSS aan het klooien met de ${favProperty} property.`;

        bioElement.innerHTML = tempDiv.innerHTML || '<em>Geen bio ingevuld</em>';

        // GitHub handle
        const githubElement = document.querySelector('.sidebar-github');
        if (github && github !== 'null') {
            githubElement.innerHTML = `<img src="https://img.icons8.com/ios11/512/FFFFFF/github.png" width="20" style="vertical-align: middle;"> <a href="https://github.com/${github}" target="_blank" style="color: inherit;">${github}</a>`;
        } else {
            githubElement.innerHTML = '';
        }

        // Styling
        sideBar.style.backgroundColor = color;
        sideBar.style.color = contrastColor;
        sidebarName.style.color = contrastColor;
        sidebarName.style.textShadow = (contrastColor === 'black') ? 'none' : '2px 2px 0px #000';
        sideBar.style.outline = (contrastColor === 'black') ? 'none' : '4px solid #ffffff';
        sideBar.style.outlineOffset = (contrastColor === 'black') ? '0px' : '-4px';

        // Spotify song laden
        loadUri(favSong);

        // Sidebar tonen
        sideBar.classList.add('trigger-sidebar');
    });
});

function calculateAge(birthdate) {
    if (!birthdate || birthdate === "null") return null;

    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const chatForm = document.querySelector('#chatForm');
const messagesList = document.querySelector('.messages');

if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(chatForm);
        const data = {
            from: formData.get('from'),
            text: formData.get('text')
        };

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                let userColor = '#009100'; // Default kleur als er geen match is
                const inputName = data.from.toLowerCase().trim();

                personCards.forEach(card => {
                    const personName = card.getAttribute('data-name').toLowerCase();
                    if (inputName !== "" && (personName.includes(inputName) || inputName.includes(personName))) {
                        userColor = card.getAttribute('data-color');
                    }
                });

                const contrast = getContrastColor(userColor);
                const now = new Date();
                const timeString = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

                const newMessage = document.createElement('p');
                newMessage.style.backgroundColor = userColor;
                newMessage.style.color = contrast;

                newMessage.innerHTML = `
                    <span class="student">${data.from}</span>: ${data.text} 
                    <span class="timestamp" style="color: ${contrast};"> | ${timeString}</span>
                `;

                messagesList.prepend(newMessage);
                document.querySelector('#chatText').value = '';
            }
        } catch (error) {
            console.error('Fout:', error);
        }
    });
}