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
        const isActive = card.classList.contains('active');
        const sidebarName = document.querySelector('.sidebar-name');
        const sidebarNickname = document.querySelector('.sidebar-nickname');
        const sidebarInfo = document.querySelector('.sidebar-basis-informatie');
        const bioElement = document.querySelector('.sidebar-bio');

        // Functie om de data te "unloaden"
        const resetSidebar = () => {
            sideBar.classList.remove('trigger-sidebar');
            personCards.forEach(c => c.classList.remove('active'));
            
            // Maak de velden leeg na de transitie (zodat je het niet ziet verspringen)
            setTimeout(() => {
                sidebarName.textContent = "";
                sidebarNickname.textContent = "";
                sidebarNickname.style.display = "none";
                sidebarInfo.innerHTML = "-";
                bioElement.innerHTML = "-";
                sideBar.style.backgroundColor = "";
                sideBar.style.outline = "none";
            }, 200); // match de 0.2s transition in je CSS
        };

        // 1. Als hij al actief was: unloaden en stoppen
        if (isActive) {
            resetSidebar();
            return; 
        }

        // 2. Reset eerst alles voordat we nieuwe data inladen
        personCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // --- Data ophalen ---
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

        // Contrast bepalen
        const contrastColor = getContrastColor(color);

        // Bio opschonen
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawBio;
        const divs = tempDiv.querySelectorAll('div');
        divs.forEach(div => {
            while (div.firstChild) {
                div.parentNode.insertBefore(div.firstChild, div);
            }
            div.parentNode.removeChild(div);
        });

        // --- Sidebar invullen (Inladen) ---
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

        // Styling
        sideBar.style.backgroundColor = color;
        sideBar.style.color = contrastColor; 
        sidebarName.style.color = contrastColor;
        sidebarName.style.textShadow = (contrastColor === 'black') ? 'none' : '2px 2px 0px #000';
        sideBar.style.outline = (contrastColor === 'black') ? 'none' : '4px solid #ffffff';
        sideBar.style.outlineOffset = (contrastColor === 'black') ? '0px' : '-4px';

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