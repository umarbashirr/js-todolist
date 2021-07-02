'use strict';

const todoData = [];
const todoForm = document.querySelector('#todo-form');
const addTodo = document.querySelector('#add-todo');
const newTodo = document.querySelector('#new-todo');
const todoList = document.querySelector('.todo-lists');

// Display Data

window.addEventListener('DOMContentLoaded', function () {
  displayTodoData();
});

function displayTodoData() {
  todoData.map((todo) => {
    const todoLi = `<li
            class="
              todo-item
              list-group-item
              d-flex
              align-items-center
              justify-content-between
            "
          >
            ${todo.task}
            <div class="buttons">
              <span
                ><button class="btn btn-success btn-sm me-1">
                  <i class="fas fa-check"></i></button></span
              ><span
                ><button class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i></button
              ></span>
            </div>
          </li>`;
    todoList.innerHTML = todoLi;
  });
}

addTodo.addEventListener('click', (event) => {
  const todoValue = newTodo.value.trim();
  event.preventDefault();
  if (todoValue === '') {
    displayAlert('danger', 'Please Enter a Valid Input!');
  } else {
    addNewTodo();
  }
  //   console.log(todoValue);
});

// Display Error Alert

function displayAlert(type, message) {
  document.querySelector(
    '.message'
  ).innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  setTimeout(() => {
    document.querySelector('.message').innerHTML = '';
  }, 3000);
}

function addNewTodo() {
  // Grab Todo Value
  let todoValue = newTodo.value.trim();

  //   All Classes for New Li
  const liClasses = [
    'todo-item',
    'list-group-item',
    'd-flex',
    'align-items-center',
    'justify-content-between',
  ];

  //   All Classes for Success Span

  const successSpanClasses = ['btn', 'btn-success', 'btn-sm', 'me-1'];

  //   All Classes for Delete Span

  const deleteSpanClasses = ['btn', 'btn-danger', 'btn-sm'];

  //   Create New Li Tag
  const li = document.createElement('li');

  //   Append all classes to created li
  li.classList.add(...liClasses);

  //   Add Input Value to Created li
  li.textContent = todoValue;

  //   Create New Div Element
  const div = document.createElement('div');

  //   Add 'buttons' class to created div
  div.classList.add('buttons');

  //   Create Success Span
  const successSpan = document.createElement('span');

  //   Append SuccessSpanClasses to Success Span
  successSpan.classList.add(...successSpanClasses);

  successSpan.setAttribute('name', 'check-button');

  //   Add Tick Icon to success Span
  successSpan.innerHTML = `<i class="fas fa-check"></i>`;

  //   Create Delete Span
  const deleteSpan = document.createElement('span');

  //   Append deleteSpanClasses to delete Span
  deleteSpan.classList.add(...deleteSpanClasses);

  //   Add Tick Icon to success Span
  deleteSpan.innerHTML = `<i class="fas fa-trash"></i>`;

  //   Append both span to button div

  div.appendChild(successSpan);
  div.appendChild(deleteSpan);

  //   Append Created Div to li
  li.appendChild(div);

  todoData.push({ id: todoData.length + 1, task: todoValue });

  //   Append li to ul

  document.querySelector('.todo-lists').appendChild(li);
  displayAlert('success', 'Task Added Successfully');

  //   Reset Input Value
  document.querySelector('#new-todo').value = '';

  //   Delete Button Functionality
  const deleteButton = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', function () {
      this.parentElement.parentElement.remove();
    });
  }

  //   Success Button Functionality
  const checkButton = document.getElementsByClassName('btn-success');
  for (let i = 0; i < checkButton.length; i++) {
    checkButton[i].addEventListener('click', function () {
      this.parentElement.parentElement.classList.add(
        'bg-success',
        'text-white',
        'line-through'
      );
      this.parentElement.parentElement.style.textDecoration = 'line-through';
    });
  }
}
