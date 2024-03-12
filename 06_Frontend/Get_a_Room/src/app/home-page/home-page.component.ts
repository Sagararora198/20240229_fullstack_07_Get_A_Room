import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchComponentComponent,HotelContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  onSearch(eventData:any){
    if(eventData.checkoutDate==null){
      //logic of automatically taking the checkout date
    }
  }

  TopRatedHotels:{hotelName:String,hotelAddress:String,hotelPricerange:String}[]=[
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad",
      hotelPricerange:""
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad",
      hotelPricerange:""
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad",
      hotelPricerange:""
    },
    {
      hotelName:"Pride In",
      hotelAddress:"Hitech city , Hyderabad",
      hotelPricerange:""
    },
  ]


}
