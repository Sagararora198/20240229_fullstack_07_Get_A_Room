import { Component } from '@angular/core';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
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
}
