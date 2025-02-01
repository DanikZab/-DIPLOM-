// Элементы DOM
const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const profileSection = document.getElementById('profile');
const registerSection = document.getElementById('register-form');
const loginSection = document.getElementById('login-form');
const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');
const logoutButton = document.getElementById('logout');
const usernameSpan = document.getElementById('username');
const responseMessage = document.getElementById('response-message');

// Показать форму входа
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.classList.remove('visible');
    setTimeout(() => {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        setTimeout(() => loginSection.classList.add('visible'), 10);
    }, 300);
});

// Показать форму регистрации
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.remove('visible');
    setTimeout(() => {
        loginSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
        setTimeout(() => registerSection.classList.add('visible'), 10);
    }, 300);
});

// Регистрация
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Проверяем, существует ли пользователь
    if (localStorage.getItem(username)) {
        showMessage('Пользователь уже существует!', 'error');
        return;
    }

    // Сохраняем пользователя (в реальном проекте пароль нужно хэшировать!)
    localStorage.setItem(username, btoa(password)); // Шифруем пароль
    showMessage('Регистрация успешна!', 'success');
    registerForm.reset();
    registerSection.classList.remove('visible');
    setTimeout(() => {
        registerSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        setTimeout(() => loginSection.classList.add('visible'), 10);
    }, 300);
});

// Вход
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Проверяем, существует ли пользователь
    const savedPassword = localStorage.getItem(username);
    if (!savedPassword) {
        showMessage('Пользователь не найден!', 'error');
        return;
    }

    // Проверяем пароль
    if (btoa(password) === savedPassword) {
        showMessage('Вход выполнен!', 'success');
        loginForm.reset();
        loginSection.classList.remove('visible');
        setTimeout(() => {
            loginSection.classList.add('hidden');
            profileSection.classList.remove('hidden');
            setTimeout(() => profileSection.classList.add('visible'), 10);
        }, 300);
        usernameSpan.textContent = username;
    } else {
        showMessage('Неверный пароль!', 'error');
    }
});

// Выход
logoutButton.addEventListener('click', () => {
    profileSection.classList.remove('visible');
    setTimeout(() => {
        profileSection.classList.add('hidden');
        registerSection.classList.remove('hidden');
        setTimeout(() => registerSection.classList.add('visible'), 10);
    }, 300);
});

// Функция для отображения сообщений
function showMessage(text, type) {
    responseMessage.textContent = text;
    responseMessage.className = `message ${type}`;
    responseMessage.style.display = 'block';
    setTimeout(() => {
        responseMessage.style.display = 'none';
    }, 3000);
}

// Инициализация анимации
document.addEventListener('DOMContentLoaded', () => {
    registerSection.classList.add('visible');
});
