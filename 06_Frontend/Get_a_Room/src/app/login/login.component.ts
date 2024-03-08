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

  emailErrorVisible: boolean = false;
  passwordErrorVisible: boolean = false;
  submitDisabled: boolean = true;
  emailError: { errorMsg: string }[] = [{errorMsg:""}];
  passwordError: { errorMsg: string }[] = [{errorMsg:""}];

 

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

  handleEmailBlur(event: any) {
    const email = event.target.value;
    const error = this.validateEmail(email);
    this.emailError = error ? [{ errorMsg: error }] : [];
    if(this.emailError.length>0){
      this.emailErrorVisible = true
      
      

    }
    
    
  }
  onEmailFocus(){
    this.emailErrorVisible=false
    
    
  }

  handlePasswordBlur(event: any) {
    const password = event.target.value;
    const error = this.validatePassword(password);
    this.passwordError = error ? [{ errorMsg: error }] : [];
    if(this.passwordError.length>0){
      this.passwordErrorVisible=true
      
      
    }
  }

  onPasswordFocus(event:any){
    this.passwordErrorVisible=false
  }
  

  handelOnchange(event:any){}
  handelOnmouseenter(){}
 
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
