const todoList = document.querySelector('.todos-container')
const addForm = document.querySelector('.form-add-todo')
const searchForm = document.querySelector('.form-search')
const searchInput = document.querySelector('.form-search input[name=search]')
const feedbackElement = document.querySelector('.feedback')
const emptyListElement = document.querySelector('.empty-list-message')

const showFeedback = (feedback, type) => {
  const isSuccessFeedback = type === 'success'
  const isErrorFeedback = type === 'error'

  if (isErrorFeedback) {
    feedbackElement.classList.remove('text-success')
    feedbackElement.classList.add('text-danger')
    feedbackElement.innerHTML = `${feedback} <i class="fas fa-times"></i>`
  }

  if (isSuccessFeedback) {
    feedbackElement.classList.remove('text-danger')
    feedbackElement.classList.add('text-success')
    feedbackElement.innerHTML = `${feedback} <i class="fas fa-check"></i>`
  }

  clearFeedback(feedbackElement)
}

const clearFeedback = element => {
  setTimeout(() => {
    clearTextContent(element)
  }, 1500)
}

const toggleVisibilityTodo = (todo, action) => {
  const toShow = action === 'show'
  const toHide = action === 'hide'

  if (toShow) {
    todo.classList.remove('d-none')
    todo.classList.add('d-flex')
  }

  if (toHide) {
    todo.classList.remove('d-flex')
    todo.classList.add('d-none')
  }
}

const toggleEmptyListMessage = action => {
  const show = action === 'show'
  const hide = action === 'hide'

  if (show) emptyListElement.classList.remove('d-none')
  if (hide) emptyListElement.classList.add('d-none')
}

const addTodo = event => {
  event.preventDefault()

  const input = event.target.add
  const value = input.value.trim()
  const isEmptyTodoList = todoList.children.length === 0
  
  if (!isValidTodo(value)) {
    showFeedback('A tarefa deve conter pelo menos 4 letras', 'error')
    return
  }

  if (isEmptyTodoList) toggleEmptyListMessage('hide')

  const todoTemplateHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${value}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `

  todoList.innerHTML += todoTemplateHTML

  addForm.reset()
  showFeedback('Tarefa adicionada', 'success')
}

const deleteTodo = event => {
  const clickedElement = event.target
  const shouldDelete = clickedElement.classList.contains('delete')

  if (!shouldDelete) return

  clickedElement.parentElement.remove()
  showFeedback('Terefa removida', 'error')
  
  if (todoList.children.length === 0) toggleEmptyListMessage('show')
}

const searchTodo = event => {
  const value = event.target.value.toLowerCase()
  const todos = Array.from(todoList.children)

  const invalidResults = todos
    .filter(todo => !todo.textContent.toLowerCase().includes(value))
  
  const validResults = todos
    .filter(todo => todo.textContent.toLowerCase().includes(value))

  invalidResults.forEach(todo => toggleVisibilityTodo(todo, 'hide'))
  validResults.forEach(todo => toggleVisibilityTodo(todo, 'show'))

  const isEmptyResult = validResults.length === 0

  if (isEmptyResult) {
    toggleEmptyListMessage('show')
    return
  }

  toggleEmptyListMessage('hide')
}

const preventDefault = event => event.preventDefault()
const clearTextContent = element => element.textContent = ''
const isValidTodo = todo => todo.length >= 4

addForm.addEventListener('submit', addTodo)
todoList.addEventListener('click', deleteTodo)
searchForm.addEventListener('submit', preventDefault)
searchInput.addEventListener('input', searchTodo)
