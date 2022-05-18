const form = {
    photo: document.querySelector("#new-anime #tumbnail"),
    name: document.querySelector("#new-anime #name"),
    rating: document.querySelector("#new-anime #rating"),
    genre: document.querySelector("#new-anime #genre"),
    episodes: document.querySelector("#new-anime #episodes"),
    storyline: document.querySelector("#new-anime #storyline"),
    submit: document.querySelector("#new-anime #submit"),
}

const errorMessages = {
    name: "Entering your name is required ",
    genre: "Entering your genre is required ",
    episodes: "Entering number of episodes is required ",
    rating: "Entering number of rating is required ",
};

let contactFormulier = document.getElementById("new-anime"),
    data = {};

// value from form[input type]
let validateField = (input, value) => {

    if (value == "")
        return false
        
    return true
}

let formInput = contactFormulier.querySelectorAll("fieldset");

form.submit.addEventListener("click", (e) => {
    e.preventDefault();

    let error = false;

    // looping through the whole form 
    formInput.forEach((field) => {

        let input = field.querySelector("input, select"),
            name = input.name, //name of the input type
            value = input.value;

        // if the field has the class required run validation else dont 
        // ? = if   : = else. ondition ? true_expression : false_expression
        let valid = field.classList.contains("required") ? validateField(input, value) : true;
        if (valid) {
            if (field.classList.contains("invalid")) {
                field.classList.remove("invalid");
            }

            // for everything in the form loop as argument = value of the argument
            data[name] = value

        } else {
            errorResponse();
            field.classList.add("invalid");
            error = true
        }
    });

    if (error == false) {
        console.log("ready to send to the database");
    }
});


function errorResponse() {

    for (const [key, value] of Object.entries(errorMessages)) {

        if (key == "name") {
            document.getElementsByName('name')[0].placeholder = value;
        } else if (key == "genre") {
            document.getElementsByName('genre')[0].placeholder = value;
        } else if (key == "episodes") {
            document.getElementsByName('episodes')[0].placeholder = value;
        } else if (key == "rating") {
            document.getElementById('error').textContent = value;
        }

        // // looping through the whole form 
        // formInput.forEach((required) => {

        //     let input = required.querySelector("input"),
        //         valid = required.classList.contains("required"),
        //         value = input.value; //value of the input type

        // console.log(valid);        
        //     // console.log(input);
        //     if (value == "" && valid) {
        //         required.classList.add("invalid");
        //     } else {
        //         required.classList.remove("invalid");
        //     }
        // });
    }

}