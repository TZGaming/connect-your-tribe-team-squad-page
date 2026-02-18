let chatContainer = document.querySelector('.chatContainer')
let closeChat = document.querySelector('.closeChat')
let openChatButton = document.querySelector('.openChat')

closeChat.addEventListener('click', () => {
    chatContainer.classList.add('hide')
    openChatButton.classList.add('show')
})

openChatButton.addEventListener('click', () => {
    chatContainer.classList.remove('hide')
    openChatButton.classList.remove('show')
})