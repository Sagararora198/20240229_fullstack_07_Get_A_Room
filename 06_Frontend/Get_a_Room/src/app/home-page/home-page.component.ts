import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponent } from '../search/search.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchComponentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
