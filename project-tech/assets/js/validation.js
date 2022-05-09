const form = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    message: document.getElementById("description"),
    photo: document.getElementById("imageUpload"),
    username: document.getElementById("username"),
    psw: document.getElementById("psw"),
    pswRepeat: document.getElementById("psw-repeat"),
    submit: document.getElementById("submit"),
}

const errorMessages = {
    name: "Entering your name is required ",
    email: "Entering your email is required ",
    usernam: "Entering your username is required ",
    psw: "Entering your password is required ",
    pswRepeat: "Repeating your password is required ",
};


let contactFormulier = document.getElementById("register");

// value from form[input type]
let validateField = (input, value) => {

    if (value == "")
        return false

    console.log(validateField);
    return true
}

let formInput = contactFormulier.querySelectorAll("fieldset");
form.submit.addEventListener("click", (e) => {
    e.preventDefault();

    let data = {},
        error = false;

    // looping through the whole form 
    formInput.forEach((field) => {

        let input = field.querySelector("input, select, textarea"),
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
            errorResponse()
            field.classList.add("invalid");
            error = true
        }
    });

    if (error == false) {
        console.log("ready to send to the database")
    } else {
        console.log("please check again")
    }
});



function errorResponse() {

    for (const [key, value] of Object.entries(errorMessages)) {

        if (key == "name") {
            document.getElementsByName('name')[0].placeholder = value;
        } else if (key == "email") {
            document.getElementsByName('email')[0].placeholder = value;
        } else if (key == "username") {
            document.getElementsByName('username')[0].placeholder = value;
        } else if (key == "psw") {
            document.getElementsByName('psw')[0].placeholder = value;
        } else if (key == "pswRepeat") {
            document.getElementsByName('psw-repeat')[0].placeholder = value;
        }

        //looping through the whole form 
        // formInput.forEach((required) => {

        //     let input = required.querySelector("input"),
        //         valid = required.classList.contains("required"),
        //         value = input.value; //value of the input type

        //     console.log(input);
        //     if (value == "" && valid) {
        //         required.classList.add("invalid");
        //     } else {
        //         required.classList.remove("invalid");
        //     }
        // })
    }

}