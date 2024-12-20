document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const todosContainer = document.getElementById('todos');
    const errorMessage = document.querySelector('.error-message');

    let filterType = true; // true - фильтр id >= 100, false - id < 100

    function fetchTodos() {
        preloader.style.display = 'block';

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then(data => {
                const filteredTodos = data.filter(todo => {
                    if (filterType) {
                        return todo.id >= 100;
                    } else {
                        return todo.id < 100;
                    }
                });
                renderTodos(filteredTodos);
                filterType = !filterType;
            })
            .catch(error => {
                errorMessage.style.display = 'block';
                errorMessage.textContent = '⚠ Что-то пошло не так';
                console.error(error);
            })
            .finally(() => {
                preloader.style.display = 'none';
            });
    }

    function renderTodos(todos) {
        todosContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todoItem.innerHTML = `
                <span>${todo.title}</span>
                <span>${todo.completed ? '✔' : '✘'}</span>
            `;


todosContainer.appendChild(todoItem);
        });
    }

    fetchTodos();
});