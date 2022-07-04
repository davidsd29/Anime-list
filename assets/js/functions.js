var options = {
  // de classes van de h2's en p's (daarin gaat gezocht worden naar matches)
  valueNames: [ 'name', 'movie' ]
};

/* het daadwerkelijk initialiseren van het zoeken */
// theList - de ID van de main
// options - hierboven gedefinieerd
var charactersList = new List('theList', options);

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