console.log("site.js is linked correctly.");

// send a secret message, Zelda-style
localStorage.setItem(
  "It's a secret to everybody.",
  'A wise man once bombed a cave wall for less. Hope your grading goes well!'
)

// grab the welcome div
const welcomeDiv = document.querySelector('#welcome')

// figure out the time of day
const hours = new Date().getHours() // get the current hour

const isMorning = hours >= 4 && hours < 12 // is it morning?
const isAfternoon = hours >= 12 && hours < 17 // is it afternoon?
const isEvening = hours >= 17 || hours < 4 // is it evening?

// build the appropriate message
let message = ''

if (isMorning) {
  message = 'Mornings still feel like a rough draft. Glad you’re reading this one.'
} else if (isAfternoon) {
  message = 'Afternoon’s a strange little pocket of the day. Glad you’re in it.'
} else if (isEvening) {
  message = 'Evening has a way of slowing everything down. Glad you’re here for it.'
}

// display the message on the page
welcomeDiv.textContent = message

// carousel - poster images for the favorites list, stored in the img folder
const urls = [
    '/img/lost.jpg',
    '/img/from.jpg',
    '/img/one-piece.jpg',
    '/img/umbrella-academy.jpg',
    '/img/hill-house.jpg',
    '/img/bly-manor.jpg'
].map(url => { (new Image()).src = url; return url })

const images = document.querySelectorAll('#carousel img')

let currentImage = 0
const showImages = () => {
    const offset = currentImage % urls.length
    images.forEach((image, index) => {
        const imageIndex = (index + offset + urls.length) % urls.length
        image.src = urls[imageIndex]
    })
}

showImages()

// grab the previous and next buttons
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')

// shift left (forward) when next is clicked
nextButton.addEventListener('click', () => {
    currentImage++
    showImages()
})

// shift right (backward) when previous is clicked
prevButton.addEventListener('click', () => {
    currentImage--
    showImages()
})

// automatically move forward every 5 seconds
setInterval(() => {
    currentImage++
    showImages()
}, 5000)

// display the to-do list (read-only) on the homepage
const renderTodos = () => {
    const todoList = document.querySelector('.todo-list')
    const todos = JSON.parse(localStorage.getItem('todo-list')) || []

    todoList.innerHTML = ''

    todos.forEach(todo => {
        const li = document.createElement('li')

        const label = document.createElement('span')
        label.textContent = todo.text

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.disabled = true // read-only on the homepage

        li.append(label, checkbox)
        todoList.append(li)
    })
}

renderTodos()

// send the user to the to-do page when the manage button is clicked
const manageTodoButton = document.querySelector('#manage-todo-button')
manageTodoButton.addEventListener('click', () => {
    location.href = '/todo.html'
})