// global variables
const todos = document.querySelector('.todos-container')
const formAdd = document.querySelector('.form-add-todo')
const formSearch = document.querySelector('.form-search')
const searchInput = formSearch.search


// functions


// events
formAdd.addEventListener('submit', event => {
  event.preventDefault()

  const todo = event.target.add.value

  const todoTemplateHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `

  todos.innerHTML += todoTemplateHTML

  event.target.add.value = ''
})

todos.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove()
  }
})

formSearch.addEventListener('submit', event => {
  event.preventDefault()
})

searchInput.addEventListener('input', event => {
  const search = event.target.value.toLowerCase()

  const todoChildren = Array.from(todos.children)

  todoChildren.forEach(todo => {

    if (!todo.textContent.toLowerCase().includes(search)) {
      todo.classList.remove('d-flex')
      todo.classList.add('d-none')

      return
    }

    if (todo.textContent.includes(search)) {
      todo.classList.remove('d-none')
      todo.classList.add('d-flex')
    }
  })
})