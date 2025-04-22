import Manifest from '@mnfst/sdk';

const manifest = new Manifest();

const logo = document.getElementById('logoWrapper');
const form = document.getElementById("formWrapper");
const desktop = document.getElementById("desktopWrapper");
const errorL = document.getElementById("errorL");
const errorR = document.getElementById("errorR");
const password = document.getElementById("password");
const email = document.getElementById("email");
const remember = document.getElementById("remember");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const repeatPassword = document.getElementById("repeatPassword");

setTimeout(function(){
    if (logo) {
        logo.style.display = 'none';
    }
}, 2000); 

function changeForm (isLogin: boolean) {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (password) {password.value = "";}
    if (email) {email.value = "";}
    if (remember) {remember.checked = false;}
    if (registerEmail) {registerEmail.value = "";}
    if (registerPassword) {registerPassword.value = "";}
    if (repeatPassword) {repeatPassword.value = "";}
    if (errorL) {errorL.style.display = "none";}
    if (errorR) {errorR.style.display = "none";}

    if (loginForm && registerForm && isLogin) {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    } else if (loginForm && registerForm) {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
}

async function loginButton () {


    if (password && email && remember && errorL) {


        if (email.value == "" || password.value == "") {
            errorL.style.display = "block";
            errorL.innerHTML = "Please fill out the form";
        } else if (email.value && password.value) {
            await manifest.login('users', email.value, password.value)

            if (remember.checked) {
                localStorage.setItem("ASemail", email.value);
                localStorage.setItem("ASpswd", password.value);
            }
    
            sessionStorage.setItem("ASemail", email.value);
            sessionStorage.setItem("ASpswd", password.value);

            login();
        }     
    }

}

async function loginRemember () {
    const localEmail = localStorage.getItem('ASemail');
    const localPswd = localStorage.getItem('ASpswd');
    const seshEmail = sessionStorage.getItem('ASemail');
    const seshPswd = sessionStorage.getItem('ASpswd');

    if (seshEmail && seshPswd) {
        await manifest.login('users', seshEmail, seshPswd);
    } else if (localEmail && localPswd) {
        await manifest.login('users', localEmail, localPswd);
    }

    login();
}

async function login() {
    
    let me = await manifest.from('users').me();


    if (me && form && desktop) {
        form.style.display = "none";
        desktop.style.display = "block";
    } else if (errorL) {
        errorL.style.display = "block";
        errorL.innerHTML = "Can't find the user";
    }
}

async function logout () {
    await manifest.logout();
    sessionStorage.clear();
    localStorage.clear();

    location.reload();
}

async function register() {

    if (!registerEmail || !registerPassword || !repeatPassword || !errorR) {
        return
    }
    
    if (registerEmail.value == "" || registerPassword.value == "" || registerPassword.value == "") {
        errorR.style.display = "block";
        errorR.innerHTML = "Please fill out the form";
    } else if (registerPassword.value != repeatPassword.value) {
        errorR.style.display = "block";
        errorR.innerHTML = "Passwords are different";
    } else {
            await manifest.from("users").create({
                email: registerEmail.value,
                password: registerPassword.value,
            })
            changeForm(false);
    }


}

loginRemember();
(window as any).changeForm = changeForm;
(window as any).loginRemember = loginRemember;
(window as any).loginButton = loginButton;
(window as any).logout = logout;
(window as any).register = register;