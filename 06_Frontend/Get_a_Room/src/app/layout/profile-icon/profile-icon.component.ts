import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-icon.component.html',
  styleUrl: './profile-icon.component.css'
})
export class ProfileIconComponent {
  @Input() profileVisibility:Boolean = true


}
