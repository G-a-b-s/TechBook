const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

const LOGIN_URL = "index.html";

// parte de login e cadastro

document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('sign-in-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const signInForm = document.querySelector('.sign-in-form');
    const signUpForm = document.querySelector('.sign-up-form');
    const signInBtn2 = document.getElementById('sign-in-btn2');
    const signUpBtn2 = document.getElementById('sign-up-btn2');

    signInBtn.addEventListener('click', () => {
        document.querySelector('.container').classList.remove('sign-up-mode');
    });

    signUpBtn.addEventListener('click', () => {
        document.querySelector('.container').classList.add('sign-up-mode');
    });

    signInBtn2.addEventListener('click', () => {
        document.querySelector('.container').classList.remove('sign-up-mode');
    });

    signUpBtn2.addEventListener('click', () => {
        document.querySelector('.container').classList.add('sign-up-mode');
    });

    function generateId() {
        return 'xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('txt_login').value;
        const email = document.getElementById('txt_email').value;
        const password = document.getElementById('txt_senha').value;

        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('Usuário já existente !');
        } else {
            const id = generateId();
            users.push({ id, username, email, password });
            sessionStorage.setItem('users', JSON.stringify(users));
            alert('Conta criada com sucesso!');
            signUpForm.reset();
            document.querySelector('.container').classList.remove('sign-up-mode');
        }
    });

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(sessionStorage.getItem('users')) || [];
        const validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            alert('Login feito com sucesso!');
        } else {
            alert('Credenciais inválidas!');
        }
    });
});
