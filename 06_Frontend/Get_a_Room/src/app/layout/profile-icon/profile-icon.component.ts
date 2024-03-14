import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../behaiviour-service.service';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
@Component({

  selector: 'app-profile-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css'
})
export class ProfileIconComponent {
  @Input() profileVisibility:Boolean = true

  isSignedUp: boolean = false;

  // private sessionTimerSubscription: Subscription = Subscription.EMPTY;
  // private sessionDuration = 30 * 60 * 10000000;

  constructor(private authService: AuthService,
    private router:Router) {
      // this.startSessionTimer();
    }


  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isSignedUp = loggedIn;
    });
  }

  // startSessionTimer(): void {
  //   this.clearSessionTimer(); // Clear any existing timer

  //   // Start a new timer
  //   this.sessionTimerSubscription = timer(this.sessionDuration).subscribe(() => {
  //     alert('Session expired. You will be logged out.');
  //     this.Logout();
  //   });
  // }

  // clearSessionTimer(): void {
  //   if (this.sessionTimerSubscription) {
  //     this.sessionTimerSubscription.unsubscribe();
  //   }
  // }


  //login Method
  Login():void{
    this.router.navigate(['/login'])
  }

  //login Method
  SignUp():void{
  this.router.navigate(['/signup'])
  }

  //LogOut method
  Logout(): void {

    const confirmation = confirm('Are you sure you want to log out?');

    // Check if the user confirmed the action
    if (confirmation) {
      this.isSignedUp = false;
      // clearing the token from the local Storage
      localStorage.removeItem('jwtToken');
      // For example, to redirect to a login page, you might use Angular's Router (assuming it's injected in your constructor)

      this.router.navigate(['/login']);
      // this.clearSessionTimer();
    }
  }
  // resetSessionTimer(): void {
  //   this.startSessionTimer();
  // }
}
