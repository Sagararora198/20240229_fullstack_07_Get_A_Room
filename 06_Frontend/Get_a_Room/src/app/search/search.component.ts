import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
