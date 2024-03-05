import { roles } from "../constants/userConstants.js"
/** password validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function passwordValidator(input){

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(input)

}
/** email validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function emailValidator(input){

    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/
    return emailRegex.test(input)
}
/** username validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function usernameValidator(input){
    if(!input){
        return false
    }
    if(input.length>20){
        return false
    }
    return true
}
/** role validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function roleValidator(input){

    const rolesValues = Object.values(roles)
    if(rolesValues.includes(input)){
        return true
    }
    else{
        return false
    }
}
/** location validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function locationValidator(input){
    if(input.length>30 || input.length<0){
        return false
    }
    return true

}
/** phone Number validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function phoneNumberValidation(){
    const phoneRegex = /^\+\d{1,4}\d{10}$/;

    return phoneRegex.test(phoneNumber);

}
/** about  validator
 * 
 * @param {String} input input password
 * @returns {Boolean} validattion 
 */
function aboutValidation(input){
    if(typeof input !="string"){
        return false
    }
    return true
}
export {passwordValidator,emailValidator,usernameValidator,roleValidator}