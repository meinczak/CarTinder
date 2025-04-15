import Manifest from '@mnfst/sdk';

const manifest = new Manifest();
const content = document.getElementById("content");

function loadVersion() {
    let isMobile = window.innerWidth <= 768;
    let file = isMobile ? "mobile.html" : "desktop.html";
    
    if (content){
        fetch(file)
        .then(response => response.text())
        .then(html => content.innerHTML = html);
    } 
    window.addEventListener("resize", loadVersion);
}

function loadModuleBasedOnOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        import('./desktop')
            .then((module) => {
                (module as { default: () => void }).default();
            })
            .catch((err) => console.error('Error loading desktop module:', err));
    } else {
        import('./mobile')
            .then((module) => {
                (module as { default: () => void }).default();
            })
            .catch((err) => console.error('Error loading mobile module:', err));
    }
}

window.addEventListener('resize', loadModuleBasedOnOrientation);
loadModuleBasedOnOrientation();

if (localStorage.AutoSwapPassword && localStorage.AutoSwapLogin) {
    await manifest.login('users', localStorage.AutoSwapLogin, localStorage.AutoSwapPassword);
    loadVersion();
} else {
    if (content) {
        fetch('form.html')
        .then(response => response.text())
        .then(html => content.innerHTML = html);
    } 
}
