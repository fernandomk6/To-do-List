const todoList = document.querySelector('.todos-container')
const addForm = document.querySelector('.form-add-todo')
const addInput = document.querySelector('.form-add-todo input[name=add]')
const searchForm = document.querySelector('.form-search')
const searchInput = document.querySelector('.form-search input[name=search]')
const feedbackAddElement = document.querySelector('.feedback-add')
const feedbackListElement = document.querySelector('.feedback-list')

const hideTodo = todo => {
  todo.classList.remove('d-flex')
  todo.classList.add('d-none')
}

const showTodo = todo => {
  todo.classList.remove('d-none')
  todo.classList.add('d-flex')
}

const isValidTodo = todo => todo.length >= 4

const addTodo = event => {
  event.preventDefault()
  clearTextContent(feedbackAddElement)

  const input = event.target.add
  const value = input.value.trim()

  if (!isValidTodo(value)) {
    feedbackAddElement.classList.remove('text-success')
    feedbackAddElement.classList.add('text-danger')
    feedbackAddElement.textContent = 'A tarefa deve conter pelo menos 4 letras'
    return
  }

  const todoTemplateHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${value}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `

  todoList.innerHTML += todoTemplateHTML

  feedbackAddElement.classList.remove('text-danger')
  feedbackAddElement.classList.add('text-success')
  feedbackAddElement.textContent = 'Tarefa adicionada'

  addForm.reset()

  feedbackListElement.classList.add('d-none')

  setTimeout(() => {
    clearTextContent(feedbackAddElement)
  }, 2000)
}

const deleteTodo = event => {
  const clickedElement = event.target
  const shouldDelete = clickedElement.classList.contains('delete')

  if (shouldDelete) clickedElement.parentElement.remove()

  if (todoList.children.length === 0) feedbackListElement.classList.remove('d-none')

  feedbackAddElement.classList.remove('text-success')
  feedbackAddElement.classList.add('text-danger')
  feedbackAddElement.textContent = 'Terefa removida'

  setTimeout(() => {
    clearTextContent(feedbackAddElement)
  }, 2000)
}

const searchTodo = event => {
  const value = event.target.value.toLowerCase()
  const todos = Array.from(todoList.children)

  const invalidResults = todos
    .filter(todo => !todo.textContent.toLowerCase().includes(value))
  
  const validResults = todos
    .filter(todo => todo.textContent.toLowerCase().includes(value))

  invalidResults.forEach(hideTodo)
  validResults.forEach(showTodo)
}

const showAddTodoFeedback = event => {
  const value = event.target.value
  clearTextContent(feedbackAddElement)

  if (isValidTodo(value)) {
    feedbackAddElement.classList.remove('text-danger')
    feedbackAddElement.classList.add('text-success')
    feedbackAddElement.textContent = 'Tarefa válida'
    return
  }
}

const clearTextContent = element => element.textContent = ''

const preventDefault = event => {
  event.preventDefault()
  event.target.reset()
}

const init = () => {
  if (todoList.children.length === 0) feedbackListElement.classList.remove('d-none')

  addForm.addEventListener('submit', addTodo)
  todoList.addEventListener('click', deleteTodo)
  searchForm.addEventListener('submit', preventDefault)
  searchInput.addEventListener('input', searchTodo)
  addInput.addEventListener('input', showAddTodoFeedback)
}

init()
