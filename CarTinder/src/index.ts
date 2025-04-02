function loadVersion() {
    let isMobile = window.innerWidth <= 768;
    let file = isMobile ? "mobile.html" : "desktop.html";
    let content = document.getElementById("content");

    console.log(1)

    if (content){
        fetch(file)
        .then(response => response.text())
        .then(html => content.innerHTML = html);
    } 
}

loadVersion();
window.addEventListener("resize", loadVersion);