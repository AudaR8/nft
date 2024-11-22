document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM полностью загружен");

    // Код для меню, вкладок и регистрации/авторизации
    const menuLinks = document.querySelectorAll('.menu__item a');
    if (menuLinks.length === 0) {
        console.warn("Меню ссылки не найдены");
    }

    // Установка активной ссылки на текущей странице
    function setActiveLinkOnLoad() {
        const currentUrl = window.location.href;
        console.log("Текущий URL:", currentUrl);

        menuLinks.forEach(link => {
            if (link.href === currentUrl) {
                link.classList.add('active');
                console.log("Активная ссылка добавлена:", link.href);
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Устанавливаем активную ссылку при загрузке
    setActiveLinkOnLoad();

    // Обработчик для нажатия на ссылки меню
    menuLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            menuLinks.forEach(link => link.classList.remove('active'));
            event.currentTarget.classList.add('active');
            window.location.href = event.currentTarget.href;
        });
    });
    // Обработчик для FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';

            const icon = item.querySelector('.faq-icon svg');
            if (icon) {
                if (icon.classList.contains('icon-plus')) {
                    icon.classList.replace('icon-plus', 'icon-minus');
                    icon.innerHTML = `
                    <circle cx="16.3918" cy="16.7463" r="15.7108" fill="#141416" stroke="#141416" stroke-width="1.20853" />
                    <rect x="10.3496" y="16.7461" width="11.481" height="1.20853" fill="white" />
                `;
                } else {
                    icon.classList.replace('icon-minus', 'icon-plus');
                    icon.innerHTML = `
                    <circle cx="16.3918" cy="16.7463" r="15.7108" fill="#141416" stroke="#141416" stroke-width="1.20853" />
                    <rect x="10.3496" y="16.7461" width="11.481" height="1.20853" fill="white" />
                    <rect x="15.4854" y="23.0908" width="11.481" height="1.20853" transform="rotate(-90 15.4854 23.0908)" fill="white" />
                `;
                }
            }
        });
    });
    // Переключение вкладок
    function showTab(tabId) {
        console.log("Переключение на вкладку:", tabId);

        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.classList.add('active');
            console.log("Показан контент для вкладки:", tabId);
        } else {
            console.warn("Контент для вкладки не найден:", tabId);
        }

        const activeButton = document.querySelector(`#${tabId}Button`);
        if (activeButton) {
            activeButton.classList.add('active');
        } else {
            console.warn("Кнопка для вкладки не найдена:", tabId);
        }
    }

    const collectionButton = document.getElementById('collectionButton');
    const activityButton = document.getElementById('activityButton');

    if (collectionButton) {
        collectionButton.addEventListener('click', () => showTab('collection'));
    } else {
        console.warn("collectionButton не найден");
    }

    if (activityButton) {
        activityButton.addEventListener('click', () => showTab('activity'));
    } else {
        console.warn("activityButton не найден");
    }

    showTab('collection');




    // Проверка, есть ли уже администратор в базе данных
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingAdmin = users.find(user => user.username === 'admin');

    // Если администратора нет, добавляем его
    if (!existingAdmin) {
        const adminUser = {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123' // Замените на нужный пароль для администратора
        };
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Администратор добавлен в базу данных.");
    }

    // Функция для показа уведомлений
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        if (isError) {
            notification.classList.add('error');
        }
        notification.textContent = message;

        document.body.appendChild(notification);

        // Убираем уведомление через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 6000);
    }

    // Функция для регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Останавливаем стандартное поведение формы

            // Получаем данные из формы
            const username = document.getElementById('login').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Проверка на совпадение паролей
            if (password !== confirmPassword) {
                showNotification('Пароли не совпадают!', true);
                return;
            }

            // Проверка, существует ли уже такой пользователь
            const existingUser = users.find(user => user.username === username || user.email === email);

            if (existingUser) {
                showNotification('Пользователь уже существует! Пожалуйста, авторизуйтесь.');
                window.location.href = '/pages/auto.html'; // Перенаправление на страницу логина
            } else {
                // Регистрация нового пользователя
                const newUser = {
                    username: username,
                    email: email,
                    password: password
                };
                users.push(newUser);

                // Сохранение пользователей в localStorage
                localStorage.setItem('users', JSON.stringify(users));

                showNotification('Регистрация успешна! Пожалуйста, авторизуйтесь.');

                // Автоматический редирект через 3 секунды
                setTimeout(function () {
                    window.location.href = '/pages/auto.html'; // Перенаправление на страницу логина
                }, 3000);
            }
        });
    }

    // Функция для авторизации
    const loginForm = document.getElementById('loginForm'); // Форма авторизации
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Останавливаем стандартное поведение формы

            // Получаем данные из формы
            const username = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            // Получаем список пользователей
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find(user => user.username === username);

            // Проверка, существует ли пользователь и правильный ли пароль
            if (!existingUser) {
                showNotification('Пользователь не найден! Пожалуйста, зарегистрируйтесь.', true);
            } else if (existingUser.password !== password) {
                showNotification('Неверный пароль!', true);
            } else {
                // Проверка на админа
                if (username === 'admin' && existingUser.password === 'admin123') { // Замените 'admin123' на реальный пароль администратора
                    showNotification('Добро пожаловать в админку!');
                    window.location.href = '/pages/admin.html'; // Перенаправление на страницу админки
                } else {
                    // Успешная авторизация для обычного пользователя
                    showNotification('Авторизация успешна!');
                    window.location.href = '/index.html'; // Перенаправление на главную страницу
                }
            }
        });
    }

    const burgerMenu = document.querySelector('.burger-menu');
    const menuList = document.querySelector('.menu-list');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        menuList.classList.toggle('active');
    });
});


