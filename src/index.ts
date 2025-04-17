import Manifest from '@mnfst/sdk';

const manifest = new Manifest();

const logo = document.getElementById('logoWrapper');
const form = document.getElementById("formWrapper");
const desktop = document.getElementById("desktopWrapper");
const errorL = document.getElementById("errorL");
const errorR = document.getElementById("errorR");

setTimeout(function(){
    if (logo) {
        logo.style.display = 'none';
    }
}, 2000); 

function changeForm (isLogin: boolean) {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm && registerForm && isLogin) {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    } else if (loginForm && registerForm) {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
}

async function login () {

    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const remember = document.getElementById("remember");

    if (password && email && remember && errorL) {

        const localEmail = localStorage.getItem('ASemail');
        const localPswd = localStorage.getItem('ASpswd');
        const seshEmail = sessionStorage.getItem('ASemail');
        const seshPswd = sessionStorage.getItem('ASpswd');

        if (seshEmail && seshPswd) {
            await manifest.login('users', seshEmail, seshPswd);
        } else if (localEmail && localPswd) {
            await manifest.login('users', localEmail, localPswd);
        } else if (email.value && password.value) {
            await manifest.login('users', email.value, password.value)

            if (remember.checked) {
                localStorage.setItem("ASemail", email.value);
                localStorage.setItem("ASpswd", password.value);
            }
    
            sessionStorage.setItem("ASemail", email.value);
            sessionStorage.setItem("ASpswd", password.value);
        }

        let me = await manifest.from('users').me();

        if (me && form && desktop) {
            form.style.display = "none";
            desktop.style.display = "block";
        } else {
            errorL.style.display = "block";
            errorL.innerHTML = "Can't find the user";
        }


        
    }
}

async function logout () {
    await manifest.logout();
    sessionStorage.clear();
    localStorage.clear();

    location.reload();
//     if (desktop && form) {
//         desktop.style.display = "none";
//         form.style.display = "flex";
//     }
}

async function register() {
    const registerEmail = document.getElementById("registerEmail");
    const registerPassword = document.getElementById("registerPassword");
    const repeatPassword = document.getElementById("repeatPassword");

    if (!registerEmail || !registerPassword || !repeatPassword || !errorR) {
        return
    }
    
    const user = await manifest.from("users").where(`email = ${registerEmail.value}`).andWhere(`password = ${registerPassword.value}`);
    console.log(user);
    console.log(registerEmail.value);
    console.log(registerPassword.value);
    console.log(repeatPassword.value);

    if (registerEmail.value == "" || registerPassword.value == "" || registerPassword.value == "") {
        errorR.style.display = "block";
        errorR.innerHTML = "Please fill out the form";
    } else if (registerPassword.value != repeatPassword.value) {
        errorR.style.display = "block";
        errorR.innerHTML = "Passwords are different";
    }
     else if (user) {
        errorR.style.display = "block";
        errorR.innerHTML = "User already exists";
    } else {
        const newUser = await manifest.from("users").create({
            email: registerEmail.value,
            password: registerPassword.value,
        })
        console.log(newUser);
        console.log("user created successfuly");
    }
}

login();
(window as any).changeForm = changeForm;
(window as any).login = login;
(window as any).logout = logout;
(window as any).register = register;