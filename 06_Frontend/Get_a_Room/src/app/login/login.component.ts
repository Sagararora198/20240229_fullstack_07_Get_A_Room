import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {

  }
/** visibility of email
 
 */
  emailErrorVisible: boolean = false;
  /**visibility of password
   */
  passwordErrorVisible: boolean = false;
  /**submit buttom visibility
   */
  submitDisabled: boolean = true;
  /**email error message
   */
  emailError: { errorMsg: string }[] = [{errorMsg:""}];
  /**password error message
   */
  passwordError: { errorMsg: string }[] = [{errorMsg:""}];

 
/** To validate email field
 * 
 * @param {String} email input email  
 * @returns {String|undefined} error string or undefined
 */
  validateEmail(email: string): string | undefined {
    if (!email) {
      return 'Email is required';
    }
  
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return 'Email is not in a valid format';
    }
  
    if (email.length > 255) {
      return 'Email is too long';
    }
  
    return undefined;
  }
  /** To validate password field
 * 
 * @param {String} email input password  
 * @returns {String|undefined} error string or undefined
 */
  validatePassword(password: string): string | undefined {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
  
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
  
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
  
    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }
  
    // Check if the password contains at least one special character
    if (!/[@$!%*#?&]/.test(password)) {
      return 'Password must contain at least one special character';
    }
  
    // Password is valid
    return undefined;
  }

  /** To handel onblue event and show error if required on email
   * 
   * @param {event} 
   */
  handleEmailBlur(event: any) {
    //take email value
    const email = event.target.value;
    // check for validation
    const error = this.validateEmail(email);
    this.emailError = error ? [{ errorMsg: error }] : [];
    // if error then make error visible
    if(this.emailError.length>0){
      this.emailErrorVisible = true
      
      

    }
    
    
  }
  /** make errormessage disabled on focus
   * 
   */
  onEmailFocus(){
    this.emailErrorVisible=false
    
    
  }
/**To handel onblue event and show error if required on password
 * 
 * @param {event}  
 */
  handlePasswordBlur(event: any) {
    const password = event.target.value;
    const error = this.validatePassword(password);
    this.passwordError = error ? [{ errorMsg: error }] : [];
    if(this.passwordError.length>0){
      this.passwordErrorVisible=true
      
      
    }
  }

  /**make errormessage disabled on focus
   * 
   * 
   */
  onPasswordFocus(){
    this.passwordErrorVisible=false
  }
  

  handelOnchange(event:any){}
  handelOnmouseenter(){}
 /**to handel submit button visibility and make error msg disabled  
  * 
  * @param {event }
  */
  handelPasswordChange(event:any){
    this.passwordErrorVisible = false
    const password = event.target.value
    
    
    const error = this.validatePassword(password)

    
    
    if(typeof error=='undefined'){
      if(this.emailErrorVisible==false){
      this.submitDisabled=false;
      }
    
      
    }
  }
  

}
