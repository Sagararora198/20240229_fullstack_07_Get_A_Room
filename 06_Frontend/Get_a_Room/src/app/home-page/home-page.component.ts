import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,SearchComponentComponent,HotelContainerComponent,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private http: HttpClient,private router: Router) {
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
    this.router.navigate(['/properties'],{
      queryParams: { data: JSON.stringify(response) }
    });
  });


  
  TopRatedHotels:{hotelName:String,hotelAddress:String,hotelPricerange:String}[]=[]

  ngOnInit(): void {
    this.fetchTopRatedHotels();
  }

  fetchTopRatedHotels(): void {
    this.http.get<any[]>('http://localhost:3000/hotels/top-rated').subscribe(
      (response) => {
        // Process the response and assign it to your TopRatedHotels array
        this.TopRatedHotels = response.map(hotel => {
          return {
            hotelName: hotel.hotelName,
            hotelAddress: hotel.hotelAddress,
            hotelPricerange: '' // Since hotelPricerange is not provided in the API response, you may need to adjust this accordingly
          };
        });
      },
      (error) => {
        console.error('Error fetching top rated hotels:', error);
      }
    );
  }



}
