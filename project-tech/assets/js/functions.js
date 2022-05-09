function deleteFromList() {
    //Find index of specific object using findIndex method.    
    const Index = animes.findIndex((object => object.id == animes.id));

    //Update object's name property.
    animes[Index].like = "";
}

function addToList() {
    //Find index of specific object using findIndex method.    
    const Index = animes.findIndex((object => object.id == animes.id));

    //Update object's like property.
    animes[Index].like = "y";
}


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