let personCards = document.querySelectorAll('.person-card')
let chatContainer = document.querySelector('.chatContainer')
let closeChat = document.querySelector('.closeChat')
let openChatButton = document.querySelector('.openChat')
let sideBar = document.querySelector('.person-sidebar-container')

closeChat.addEventListener('click', () => {
    chatContainer.classList.add('hide')
    openChatButton.classList.add('show')
})

openChatButton.addEventListener('click', () => {
    chatContainer.classList.remove('hide')
    openChatButton.classList.remove('show')
})

personCards.forEach(card => {
    card.addEventListener('click', () => {
        sideBar.classList.toggle('trigger-sidebar')
    })
});