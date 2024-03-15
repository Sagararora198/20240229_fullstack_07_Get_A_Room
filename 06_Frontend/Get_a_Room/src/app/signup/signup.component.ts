import { Component, OnInit } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgStyle,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent implements OnInit {
  // constructor {}
  usernameErrorVisibility:Boolean = false
  emailErrorVisibility:Boolean = false
  passwordErrorVisibility:Boolean = false
  username:string = ''
  email:string= ''
  password:string=''
  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  submitDisabled:Boolean = true
  

  ngOnInit(): void {

  }

  validateUsername(): void {
    // Example validation: Username should not be empty
    if (this.username.trim().length === 0) {
      this.usernameErrorMessage = 'Username cannot be empty';
      this.usernameErrorVisibility = true;

    } else {
      this.usernameErrorVisibility = false;

    }
  }
  validateEmail(): void {
    // Simple email regex for demonstration
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailErrorMessage = 'Invalid email format';
      this.emailErrorVisibility = true;

    } else {
      this.emailErrorVisibility = false;

    }
  }
  validatePassword(): void {
    if (this.password.length < 8) {
      this.passwordErrorMessage = 'Password must be greater than 8 characters';
      this.passwordErrorVisibility = true;

    } else if (!/[A-Z]/.test(this.password)) {
      this.passwordErrorMessage = 'Password must contain at least one capital letter';
      this.passwordErrorVisibility = true;

    } else {
      this.passwordErrorVisibility = false;

    }
    this.checkAllValidations();
  }
  hideUsernameError(){
    this.usernameErrorVisibility = false
  }
  hideEmailError(){
    this.emailErrorVisibility = false
  }
  hidePasswordError(){
    this.passwordErrorVisibility = false
  }

  checkAllValidations(): void {
    // Check if all validations pass
    const isUsernameValid = !this.usernameErrorVisibility && this.username.trim().length > 0;
    const isEmailValid = !this.emailErrorVisibility && this.email.trim().length>0;
    const isPasswordValid = !this.passwordErrorVisibility && this.password.trim().length>0;

    // Update submitDisabled based on validations
    this.submitDisabled = !(isUsernameValid && isEmailValid && isPasswordValid);
  }

  //If already have a account then nav to Login
  navToLogin(){
    this.router.navigate(['/login'])
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Inject Router here
  ) { }


  storeUserCred() {
    const userData = {
      email: this.email,
      password: this.password,
      username: this.username,
    };

    this.http.post('http://localhost:3000/signup', userData).subscribe({
      next: (response: any) => {
        console.log('User registered successfully');
        // Optionally, store any response data or navigate to another route
        // For example, storing a token if your API returns one upon signup
        // localStorage.setItem('userToken', response.token);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        // Handle any errors, such as displaying a message to the user
      }
    });
  }

}
