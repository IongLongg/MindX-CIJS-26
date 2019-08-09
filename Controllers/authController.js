import {authUser} from '../Models/user.js';
import newValidator from "../ultis/validator.js"
import {isEmptyObject} from "../ultis/object.js"
import {
    newSuccessResponse,
    newFailureResponse,
    responseCode
} from "../Controllers/response.js"

function newAuthController() {
    const controller = {}
    controller.register = async function(registerPayload) {
        const rules = {
            
            email: [
                {
                    rule: "isEmail",
                    value: true
                }
            ],
            firstName: [
                {
                    rule: "notEmpty",
                    value: true
                }
            ],
            lastName: [
                {
                    rule: "notEmpty",
                    value: true
                }
            ],
            password: [
                {
                    rule: "minLength",
                    value: 8
                }
            ], 
            repassword: [
                {
                    rule: "isMatching",
                    value: registerPayload.password
                },
                {
                    rule: "notEmpty",
                    value: true
                }
            ]
        };
        const validator = newValidator();
        const errors = validator.validate(registerPayload, rules);
        console.log(errors)
        if (!isEmptyObject(errors)) {
            return newFailureResponse(
                responseCode.auth.register.invalid_input,
                errors);
        }  
        
        await firebase.auth().createUserWithEmailAndPassword(
            registerPayload.email, registerPayload.password);
            firebase.auth().currentUser.updateProfile({
            displayName: `${registerPayload.firstName} ${registerPayload.lastName}`
            });
            firebase.auth().currentUser.sendEmailVerification();

            return newSuccessResponse(
                responseCode.auth.register.success,
                firebase.auth().currentUser
            );
    };

    controller.login = async function(loginPayload) {
        const loginResult = await firebase
        .auth()
        .signInWithEmailAndPassword(loginPayload.email, loginPayload.password);
        authUser.id = loginResult.user.email
        authUser.name = loginResult.user.displayName
        return newSuccessResponse(responseCode.auth.login.success, authUser)
    };


    return controller;
}

export default newAuthController