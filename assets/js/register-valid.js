const form = {
    name: document.querySelector(" #register #name"),
    email: document.querySelector("#register #email"),
    message: document.querySelector("#register #description"),
    photo: document.querySelector("#register #imageUpload"),
    username: document.querySelector("#register #psw"),
    pswRepeat: document.querySelector("#register #psw-repeat"),
    submit: document.querySelector("#register #submit"),
}

const errorMessages = {
    name: "Entering your name is required ",
    email: "Entering your email is required ",
    usernam: "Entering your username is required ",
    psw: "Entering your password is required ",
    pswRepeat: "Repeating your password is required ",
};

const registrationResponse = {
    frame: document.querySelector(".form-respond"),
    text: document.getElementById("serverRespond")
}

let contactFormulier = document.getElementById("register"),
    data = {};

let validateField = (input, value) => {

    if (value == "")
        return false

    return true
}

let formInput = contactFormulier.querySelectorAll(" fieldset");

form.submit.addEventListener("click", (e) => {
    //  e.preventDefault();

    let error = false;
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
        // event.returnValue = true;
        registerd();
        console.log("ready to send to the database");
    }
});




function registerd() {
    registrationResponse.text.textContent = "Thanks " + data.name + "! Your account has been made with the username: " + data.username;
    registrationResponse.frame.classList.remove("hidden");
    contactFormulier.classList.add("blur");
}


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