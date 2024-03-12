import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchComponentComponent,HotelContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private http: HttpClient) {
  }

  onSearch(searchParams: any): void {
    if (!searchParams.city || !searchParams.checkinDate || !searchParams.checkoutDate) {
      console.error('Missing search parameters');
      return;
    }
    const url = `http://localhost:3000/hotels?searchLocation=${searchParams.city}&checkInDate=${searchParams.checkinDate}&checkOutDate=${searchParams.checkoutDate}`;

  console.log('Search parameters:', searchParams);
  console.log('Request URL:', url);

  this.http.get(url).subscribe((response) => {
    console.log('API Response:', response);
  });

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
