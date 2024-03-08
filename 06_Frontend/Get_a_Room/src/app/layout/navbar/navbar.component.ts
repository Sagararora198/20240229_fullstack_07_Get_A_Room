import { Component } from '@angular/core';
import { DropdownProfileComponent } from '../dropdown-profile/dropdown-profile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DropdownProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
