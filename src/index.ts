import Manifest from '@mnfst/sdk'

const manifest = new Manifest();
const users = await manifest.from('Users').find();
console.log(users);

function loadVersion() {
    let isMobile = window.innerWidth <= 768;
    let file = isMobile ? "mobile.html" : "desktop.html";
    let content = document.getElementById("content");

    if (content){
        fetch(file)
        .then(response => response.text())
        .then(html => content.innerHTML = html);
    } 
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


loadVersion();
window.addEventListener("resize", loadVersion);