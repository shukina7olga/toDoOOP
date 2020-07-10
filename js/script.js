// eslint-disable-next-line strict
'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.todoContainer = document.querySelector('.todo-container');
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoRemove = document.querySelector('.todo-remove');
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else if (this.input.value === '') {
            alert('Введите значение, поле не должно быть пустым.');
            this.render();
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(todoKey) {
        const keys = this.todoData.keys();
        keys.forEach(element => {
            if (todoKey === element) {
                this.todoData.delete(todoKey);
            }
        });
        this.render();
        // по ключу найти айтем
        // удалить из Map
        // сделать рендер
    }

    //completedItem(todoKey) {
    //    this.todoData.newTodo.completed = true;
    // перебраь через foreEach все элементы тодудата
    // найти элемент которому соответствует тот ключ элемен на котор кликн
    //поменять значение комплетед с - на +
    //}

    handler() {
        this.todoContainer.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('.todo-remove')) {
                target.key = target.closest('.todo-item').key;
                //const todoKey = target.key;
                this.deleteItem(target.key);
            } else if (target.classList.contains('.todo-complete')) {
                target.key = target.closest('.todo-item').key;
                //const todoKey = target.key;
                this.completedItem(target.key);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
