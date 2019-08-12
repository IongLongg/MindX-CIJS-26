import login from "./login.js"
import view from "../view.js"
import newAuthController from "../../Controllers/authController.js"
import {responseCode} from "../../Controllers/response.js"
import {messages} from "../messages.js"

const registerScreen = `
<div class="container">
  <div class="row">
    <div class="col-sm">
    
    </div>
    <div class="col-sm">
        <form id="js-formRegister" >
            <h1>Register</h1>
            <div id="js-alertSuccess" ></div>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Your first name ...">
            </div>
            <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Your last name ...">
            </div>
            <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Your email ...">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
            <label for="repassword">Password</label>
            <input type="password" class="form-control" id="repassword" placeholder="Retyped password">
            </div>
            <button type="submit" id="js-btnRegister" class="btn btn-primary">Register</button>
            <button type="button" id="js-btnMoveToLogin" class="btn btn-secondary">Login</button>
        </form>
    </div>
    <div class="col-sm">
      
    </div>
  </div>
</div>
`

function onload() {
    const btnMoveToLogin =  document.getElementById('js-btnMoveToLogin')
    const btnRegister = document.getElementById('js-btnRegister')
    const formRegister = document.getElementById('js-formRegister')
    btnMoveToLogin.addEventListener('click', function() {
        view.setScreen(login);
    });  
    btnRegister.addEventListener('click', async function(event) {
        event.preventDefault();
        const registerPayload = {
            firstName: formRegister.firstName.value,
            lastName: formRegister.lastName.value,
            email: formRegister.email.value,
            password: formRegister.password.value,
            repassword: formRegister.repassword.value
        };
        clearErrors();
        const authController = newAuthController();
        const response = await authController.register(registerPayload);
        if (response.type === "failure") {
            switch (response.code) {
                case responseCode.auth.register.invalid_input:
                    // invalid_input
                    showErrors(response.data);
                    break;
            }
        } else {
            switch (response.code) {
                case responseCode.auth.register.success:
                    showSuccessMessager();
                    view.setScreen(login)
            }
        }
    });
}

function showErrors(errors) {
    const fields = Object.keys(errors);
    for (let i = 0; i< fields.length; i++) {
        const field = fields[i];
        const input = document.getElementById(field);
        input.classList.add('is-invalid');
        
        const inputParent = input.parentElement;   
        for (let j = 0; j < errors[field].length; j++) {
            const error = errors[field][j];
            const errorFeedback = document.createElement("div")
            errorFeedback.setAttribute("class", "invalid-feedback");
            errorFeedback.innerHTML = messages.error[field][error.message];            
            inputParent.insertBefore(errorFeedback, input.nextSibling);
        }
    }
}

function clearErrors() {
    const errorFeedbacks = document.getElementsByClassName('invalid-feedback');
    while (errorFeedbacks.length > 0) {
        errorFeedbacks[0].remove();
    }

    const inputs = document.getElementsByClassName('is-invalid');
    while (inputs.length > 0) {
        inputs[0].classList.remove();
    }
}

function showSuccessMessager() {
    Swal.fire(
        'Good job!',
        'You have successfully registered!',
        'success'
    )
}

const register = {
    content: registerScreen,
    onload: onload
}


export default register;