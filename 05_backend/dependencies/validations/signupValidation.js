import { emailValidator, passwordValidator, usernameValidator } from "./userValidations.js"
import { Error400 } from "../constants/signupErrorConstants.js"
function signupValidation(userdata){
    const {username,email,password} = userdata
    const error = {}
    if(!passwordValidator(password)){
        error.password=Error400.INVALID_PASSWORD_FORMAT
    }
    if(!emailValidator(email)){
        error.email = Error400.INVALID_EMAIL_FORMAT

    }
    if(!usernameValidator(username)){
        error.username = Error400.INVALID_USERNAME_FROMAT
    }
    if(Object.keys(error).length>0){
        return {error:error}
    }
    return {success:true}

}
export default signupValidation