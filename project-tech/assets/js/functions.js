// login functions
const modal = document.getElementById("login-form");

function openLogin() {
    modal.style.display = "block";
}

function closeLogin() {
    modal.style.display = "none";
}

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}
