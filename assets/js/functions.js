// login functions
// const modal = document.getElementById('login-module');

// function openLogin() {
//     mobileMenu.classList.add('d-none');
//     modal.style.display = 'block';

// }

// function closeLogin() {
//     modal.style.display = 'none';
// }

// window.onclick = (e) => {
//     if (e.target == modal) {
//         modal.style.display = 'none';
//     }
// };

// LIST Order
const anime = document.querySelectorAll('.draggable');
const moveUp = document.querySelectorAll('.move-up');
const moveDown = document.querySelectorAll('.move-down');

moveUp.forEach(button => {
    button.addEventListener('click', moveSectionUp);
});

function moveSectionUp(event) {
    
    let item = event.target.closest('.draggable');// find the first parrent .draggable in dom
    let list = event.target.closest('.anime-list-entry');// find the first parrent .anime-list-entry in dom
    list.insertBefore(item, item.previousElementSibling);
}

moveDown.forEach(button => {
    button.addEventListener('click', moveSectionDown);
});

function moveSectionDown(event) {

    let item = event.target.closest('.draggable');
    let list = event.target.closest('.anime-list-entry');
    list.insertBefore(item.nextElementSibling, item);

}