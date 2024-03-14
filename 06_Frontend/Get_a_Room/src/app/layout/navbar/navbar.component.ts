import { Component } from '@angular/core';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProfileIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  profileVisibility:Boolean = false

  toggleProfileVisibility(){
    this.profileVisibility = !this.profileVisibility
  }
  constructor(private router: Router) {}

  navigateToHomePage() {
    this.router.navigate(['']); // Navigate to the home page component
  }
}
