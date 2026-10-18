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

    // create and add a list item for each todo (using forEach instead of a for loop)
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

// show any existing items when the page loads
renderTodos()

// send the user back to the homepage when the button is clicked
const backHomeButton = document.querySelector('#back-home-button')
backHomeButton.addEventListener('click', () => {
    location.href = '/index.html'
})