import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../behaiviour-service.service';
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isSignedUp = loggedIn;
    });
  }
}
