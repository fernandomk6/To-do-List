// global variables
const todoList = document.querySelector('.todos-container')
const addForm = document.querySelector('.form-add-todo')
const searchForm = document.querySelector('.form-search')
const searchInput = document.querySelector('.form-search input[name=search]')


// functions
const addTodo = event => {
  event.preventDefault()

  const todo = event.target.add.value

  const todoTemplateHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `

  todoList.innerHTML += todoTemplateHTML

  event.target.add.value = ''
}

const deleteTodo = event => {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.remove()
  }
}

const searchTodo = event => {
  const search = event.target.value.toLowerCase()
  const todoChildren = Array.from(todoList.children)

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
}

const preventDefault = event => event.preventDefault()

// events
addForm.addEventListener('submit', addTodo)
todoList.addEventListener('click', deleteTodo)
searchForm.addEventListener('submit', preventDefault)
searchInput.addEventListener('input', searchTodo)