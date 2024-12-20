document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const todosContainer = document.getElementById('todos');
    const errorMessage = document.querySelector('.error-message');

    let filterType = true; // Для псевдо-случайной фильтрации

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
                    return filterType ? todo.id >= 100 : todo.id < 100;
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
            todoItem.textContent = todo.title;

            if (todo.completed) {
                todoItem.classList.add('completed');
            }

            // Обработчик клика для показа модального окна
            todoItem.addEventListener('click', () => {
                // SweetAlert2 для отображения модального окна
                // title: Заголовок модального окна, text: текстовые детали
                Swal.fire({
                    title: 'Информация о задаче',
                    text: `Название: ${todo.title}\nСтатус: ${todo.completed ? 'Выполнена' : 'Не выполнена'}`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Изменить статус'
                }).then(result => {
                    if (result.isConfirmed) {
                        todo.completed = !todo.completed;
                        // Обновление визуального статуса выполнения
                        todoItem.classList.toggle('completed', todo.completed);

                        // Toastr для отображения уведомления об изменении статуса
                        toastr.success(`Задача "${todo.title}" обновлена! Статус: ${todo.completed ? 'Выполнена' : 'Не выполнена'}`);
                    }
                });
            });

            todosContainer.appendChild(todoItem);
        });
    }

    fetchTodos();
});
