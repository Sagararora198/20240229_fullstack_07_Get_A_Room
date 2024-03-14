import { Component } from '@angular/core';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
import { AuthService } from '../../behaiviour-service.service';

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

  
  isSignedUp: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isSignedUp = loggedIn;
    });
  }
}
