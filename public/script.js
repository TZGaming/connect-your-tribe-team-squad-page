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

// Kaarten animeren en sidebar triggeren
personCards.forEach((card, index) => {
    // Dynamische vertraging
    card.style.animationDelay = `${.25 + (index * 0.05)}s`;

    card.addEventListener('click', () => {
        sideBar.classList.toggle('trigger-sidebar');
    });
});