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
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    // cadastro 
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('txt_login').value;
        const email = document.getElementById('txt_email').value;
        const password = document.getElementById('txt_senha').value;

        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        const users = data.usuarios;

        const userExists = users.some(user => user.login === username);

        if (userExists) {
            alert('Usuário já existente!');
        } else {
            const newUser = {
                id: generateUUID(),
                login: username,
                senha: password,
                nome: '',
                email: email
            };
            users.push(newUser);

            await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuarios: users })
            });

            alert('Conta criada com sucesso!');
            signUpForm.reset();
            document.querySelector('.container').classList.remove('sign-up-mode');
        }
    });

    // login
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        const users = data.usuarios;

        const validUser = users.find(user => user.login === username && user.senha === password);

        if (validUser) {
            alert('Login feito com sucesso!');
        } else {
            alert('Credenciais inválidas!');
        }
    });

    // gera o id do user
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                  v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
});
