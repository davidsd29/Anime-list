// login functions
const modal = document.getElementById("login-form")

function openLogin() {
    mobileMenu.classList.add("d-none");
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

// const anime = document.querySelectorAll(".draggable");
// const moveUp = document.getElementById("move-up");
// const moveDown = document.getElementById("move-down");

// moveUp.addEventListener('click', () => {

// });


// moveDown.addEventListener('click', () => {

// });