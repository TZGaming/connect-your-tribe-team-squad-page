let personCards = document.querySelectorAll('.person-card');
let chatContainer = document.querySelector('.chatContainer');
let closeChat = document.querySelector('.closeChat');
let openChatButton = document.querySelector('.openChat');
let sideBar = document.querySelector('.person-sidebar-container');

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
        // Data ophalen
        const name = card.getAttribute('data-name');
        const squad = card.getAttribute('data-squad');
        const residency = card.getAttribute('data-residency');
        const color = card.getAttribute('data-color') || '#323232';
        const rawBio = card.getAttribute('data-bio');

        personCards.forEach(c => c.classList.remove('active'));
        // Voeg de active class toe aan de kaart waar op geklikt is
        card.classList.add('active');

        // Contrast bepalen
        const contrastColor = getContrastColor(color);

        // Bio opschonen, divs eruit omdat sommige mensen vervelend zijn
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawBio;
        const divs = tempDiv.querySelectorAll('div');
        divs.forEach(div => {
            while (div.firstChild) {
                div.parentNode.insertBefore(div.firstChild, div);
            }
            div.parentNode.removeChild(div);
        });

        // Sidebar invullen
        const sidebarName = document.querySelector('.sidebar-name');
        sidebarName.textContent = name;
        document.querySelector('.sidebar-squad').textContent = squad || 'Niet opgegeven';
        document.querySelector('.sidebar-residency').textContent = residency || 'Onbekend';
        
        const bioElement = document.querySelector('.sidebar-bio');
        bioElement.innerHTML = tempDiv.innerHTML || '<em>Geen bio ingevuld</em>';

        // Dynamisch contrast
        sideBar.style.backgroundColor = color;
        sideBar.style.color = contrastColor; 
        
        // Text-shadow verdwijnt bij zwarte tekst
        sidebarName.style.color = contrastColor;
        sidebarName.style.textShadow = (contrastColor === 'black') ? 'none' : '2px 2px 0px #000';

        // Sidebar openen
        sideBar.classList.add('trigger-sidebar');
    });
});