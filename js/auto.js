// Обработчик для формы с ID 'loginForm' (проверка на существование формы)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('login').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Пароли не совпадают. Пожалуйста, попробуйте снова.");
            return;
        }

        const adminCredentials = {
            username: "admin",
            email: "admin@example.com",
            password: "admin123"
        };

        const userCredentials = {
            username: "user",
            email: "user@example.com",
            password: "user123"
        };

        // Проверка на существующих пользователей
        let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Если найдено совпадение с администратором или пользователем
        if (username === adminCredentials.username && email === adminCredentials.email && password === adminCredentials.password) {
            window.location.href = "/pages/admin.html";
        } else if (username === userCredentials.username && email === userCredentials.email && password === userCredentials.password) {
            window.location.href = "/index.html";
        } else {
            // Проверка на наличие нового пользователя
            const existingUser = storedUsers.find(user => user.username === username && user.email === email);

            if (existingUser) {
                alert("Пользователь с таким именем и почтой уже существует.");
            } else {
                // Регистрация нового пользователя
                const newUser = { username, email, password };
                storedUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(storedUsers));
                alert("Вы успешно зарегистрированы. Пожалуйста, войдите.");
                window.location.href = "/pages/auto.html"; // Перенаправление на страницу входа
            }
        }
    });
} else {
    console.warn("Форма loginForm не найдена");
}