import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, SearchComponentComponent,HotelContainerComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  onSearch(eventData:any){
    
  }
  searchedHotels:{hotelName:String,hotelAddress:String,hotelPricerange:String}[]=[
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
    {
      hotelName:"Pride Inn",
      hotelAddress:"Madhapur Hyderabad",
      hotelPricerange:"$1000- $2000"
    },
  ]
}
