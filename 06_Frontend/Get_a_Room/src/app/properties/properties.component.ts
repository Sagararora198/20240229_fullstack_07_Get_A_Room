import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, SearchComponentComponent, HotelContainerComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',

})
export class PropertiesComponent {
  receivedData: any;
  searchedHotels: {_id:string , hotelName: string, hotelAddress: string, hotelPricerange: string, hotelPhoto: string }[] = [];
  h_id:string="";

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.receivedData = JSON.parse(params['data']);
        console.log("data in properties ", this.receivedData);
        this.extractHotelData();
       
      }
    });
  }

  extractHotelData() {
    this.receivedData.forEach((hotel: any) => {
      const newHotel = {
        _id:hotel._id,
        hotelName: hotel.hotelName,
        hotelAddress: hotel.hotelAddress,
        hotelPricerange: '',
        hotelPhoto: hotel.hotelPhotos[0]
      };
      this.h_id=newHotel._id
      console.log("HELELO ",this.h_id);
      
      this.searchedHotels.push(newHotel);
    });
  }

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
  selectedOption: string | null = null;

  selectOption(option: string) {
    this.selectedOption = option;
  }

  runFunction1() {
    this.searchedHotels.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
  }
  runFunction2() {
    this.searchedHotels.sort((a, b) => b.hotelName.localeCompare(a.hotelName));
  }

  NavigateToHotel(hotelId: string) {
    console.log("Clicked hotel ID: " + hotelId);
    this.router.navigate([`/hoteldesc/${hotelId}`]);
  }

}
