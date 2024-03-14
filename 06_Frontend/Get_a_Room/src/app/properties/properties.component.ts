import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SearchComponentComponent } from '../layout/search-component/search-component.component';
import { HotelContainerComponent } from '../layout/hotel-container/hotel-container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, SearchComponentComponent, HotelContainerComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',

})
export class PropertiesComponent {
  receivedData: any;
  searchedHotels: { hotelName: string, hotelAddress: string, hotelPricerange: string, hotelPhoto: string }[] = [];

  constructor(private route: ActivatedRoute) { }

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
      console.log("hey :", hotel.hotelPhotos['photo1']);

      const newHotel = {
        hotelName: hotel.hotelName,
        hotelAddress: hotel.hotelAddress,
        hotelPricerange: '',
        hotelPhoto: hotel.hotelPhotos[0]
      };
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
}
