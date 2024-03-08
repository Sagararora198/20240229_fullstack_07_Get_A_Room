import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, SearchComponentComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {

}
