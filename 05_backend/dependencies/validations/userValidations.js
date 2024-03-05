import { roles } from "../constants/userConstants.js"

function passwordValidator(input){

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(input)

}
function emailValidator(input){

    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/
    return emailRegex.test(input)
}
function usernameValidator(input){
    if(!input){
        return false
    }
    if(input.length>20){
        return false
    }
    return true
}
function roleValidator(input){

    const rolesValues = Object.values(roles)
    if(rolesValues.includes(input)){
        return true
    }
    else{
        return false
    }
}
export {passwordValidator,emailValidator,usernameValidator,roleValidator}