// global variables
const todoList = document.querySelector('.todos-container')
const addForm = document.querySelector('.form-add-todo')
const searchForm = document.querySelector('.form-search')
const searchInput = document.querySelector('.form-search input[name=search]')


// functions
const clearInput = input => input.value = ''

const hideTodo = todo => {
  todo.classList.remove('d-flex')
  todo.classList.add('d-none')
}

const showTodo = todo => {
  todo.classList.remove('d-none')
  todo.classList.add('d-flex')
}

const addTodo = event => {
  event.preventDefault()

  const addInput = event.target.add

  const todoTemplateHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${addInput.value}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `

  todoList.innerHTML += todoTemplateHTML
  clearInput(addInput)
}

const deleteTodo = event => {
  const clickedElement = event.target
  const shouldDelete = clickedElement.classList.contains('delete')

  if (shouldDelete) clickedElement.parentElement.remove()
}

const checkSearchMatch = (todo, value) => {
  const match = todo.textContent.toLowerCase().includes(value)

  if (!match) {
    hideTodo(todo)
    return
  }

  showTodo(todo)
}

const searchTodo = event => {
  const value = event.target.value.toLowerCase()
  const todos = Array.from(todoList.children)

  todos.forEach(checkSearchMatch, value)
}

const preventDefault = event => event.preventDefault()

// events
addForm.addEventListener('submit', addTodo)
todoList.addEventListener('click', deleteTodo)
searchForm.addEventListener('submit', preventDefault)
searchInput.addEventListener('input', searchTodo)