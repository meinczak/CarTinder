import Manifest from "@mnfst/sdk";

const manifest = new Manifest();
const LogError = document.getElementById("error");
let loginSuccessful = false;

async function userLogin () {
    let email = document.getElementById("email")?.innerHTML;
    let password = document.getElementById("password")?.innerHTML;

    if(!email || !password) return;
    loginSuccessful = await manifest.login('users', email, password);

    console.log(1);

    checkLogin();
}

function checkLogin () {
    if (loginSuccessful) {

    } else {
        if (!LogError) return;

        console.log(2);

        LogError.style.display = "block";
    }
}

userLogin();