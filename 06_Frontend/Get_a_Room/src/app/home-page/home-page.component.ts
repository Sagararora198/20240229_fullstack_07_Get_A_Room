import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponent } from '../search/search.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchComponentComponent,HotelContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  TopRatedHotels:{hotelName:String,hotelAddress:String}[]=[
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad"
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad"
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad"
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad"
    },
  ]
}
