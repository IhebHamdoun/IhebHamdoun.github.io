// get the elements we need
const todoList = document.querySelector('.todo-list')
const newTodoInput = document.querySelector('#new-todo')
const addTodoButton = document.querySelector('#add-todo-button')

// renders the current list of todos into the DOM
const renderTodos = () => {
    // get the list from local storage
    const todos = JSON.parse(localStorage.getItem('todo-list')) || []

    // clear the li's before we recreate them
    todoList.innerHTML = ''

    // create and add a list item for each todo 
    todos.forEach((todo, index) => {
        const li = document.createElement('li')

        // label shows the item's text, sits on the left
        const label = document.createElement('span')
        label.textContent = todo.text

        // group the checkbox and buttons together on the right
        const actions = document.createElement('div')
        actions.className = 'todo-actions'

        // checkbox toggles the completed status
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked
            localStorage.setItem('todo-list', JSON.stringify(todos))
            updateBuddy() // update the pokemon buddy when a task is checked/unchecked
        })

        // edit button lets you change the text
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit item:', todo.text)
            if (newText) {
                todo.text = newText
                localStorage.setItem('todo-list', JSON.stringify(todos))
                renderTodos()
            }
        })

        // delete button removes the item from the list
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', () => {
            todos.splice(index, 1)
            localStorage.setItem('todo-list', JSON.stringify(todos))
            renderTodos()
        })

        actions.append(checkbox, editButton, deleteButton)
        li.append(label, actions)
        todoList.append(li)
    })
    updateBuddy() // update the pokemon buddy when the list is rendered
}

// add a new todo when the button is clicked
addTodoButton.addEventListener('click', () => {
    if (!newTodoInput.value) return

    const todos = JSON.parse(localStorage.getItem('todo-list')) || []

    todos.push({ text: newTodoInput.value, completed: false })

    localStorage.setItem('todo-list', JSON.stringify(todos))

    newTodoInput.value = ''

    renderTodos()
})

// ---------- to-do buddy (random pokemon) ----------
let buddy = null // the pokemon object, once it has loaded

// fetch a random pokemon from the pokeAPI and return it
const getRandomPokemon = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 150)
    const response = await fetch(url)
    if (!response.ok) throw new Error('Pokemon request failed: ' + response.status)
    const pokemon = await response.json()
    return pokemon
}

// create an image for the pokemon and add it to the page
const renderPokemon = (pokemon) => {
    const parentElement = document.querySelector('#pokemon')

    const img = document.createElement('img')
    img.src = pokemon.sprites.front_default
    img.alt = pokemon.name
    parentElement.append(img)
}

// make the buddy react to the to-do list
const updateBuddy = () => {
    if (!buddy) return // the pokemon hasn't loaded yet

    const todos = JSON.parse(localStorage.getItem('todo-list')) || []
    const remaining = todos.filter(todo => !todo.completed).length
    const allDone = todos.length > 0 && remaining === 0

    const img = document.querySelector('#pokemon img')
    const message = document.querySelector('#buddy-message')
    const name = buddy.name.charAt(0).toUpperCase() + buddy.name.slice(1)

    if (todos.length === 0) {
        message.textContent = `${name}: Your list is empty. Time to catch some tasks!`
    } else if (allDone) {
        message.textContent = `${name}: Task list defeated! I’m sparkling with pride!`
    } else if (remaining === 1) {
        message.textContent = `${name}: 1 task left, you've got this!`
    } else {
        message.textContent = `${name}: ${remaining} wild tasks remain. Time to battle!`
    }

    // swap to the shiny sprite when everything is checked off
    if (allDone && buddy.sprites.front_shiny) {
        img.src = buddy.sprites.front_shiny
    } else {
        img.src = buddy.sprites.front_default
    }
}

// get the pokemon, then render it and update the buddy message
const showPokemon = async () => {
    try {
        buddy = await getRandomPokemon()
        renderPokemon(buddy)
        updateBuddy()
    } catch (error) {
        console.log('Could not load pokemon:', error)
    }
}

showPokemon()

// show any existing items when the page loads
renderTodos()

// send the user back to the homepage when the button is clicked
const backHomeButton = document.querySelector('#back-home-button')
backHomeButton.addEventListener('click', () => {
    location.href = '/index.html'
})

