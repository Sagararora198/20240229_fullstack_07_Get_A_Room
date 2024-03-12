import { Component } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-description',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './hotel-description.component.html',
  styleUrl: './hotel-description.component.css'
})
export class HotelDescriptionComponent {

  

  hotelDesc:{hotelName:String,hotelDesc:String,hotelImages:{image:String}[]}=
    {
      hotelName:"Pride Inn",
      hotelDesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hotelImages:[
        {image:"../assets/public/featherheart.svg"},
        {image:"../assets/public/featherheart.svg"},
        {image:"../assets/public/featherheart.svg"},
      ]
    }


    roomTypes:{roomType:String,roomGuest:Number,roomBathroom:Number,roomParking:Number,roomPet:Number}[]=[
      {
        roomType:"Super Delux Suites",
        roomGuest:4,
        roomBathroom:1,
        roomParking:2,
        roomPet:0
      },
      {
        roomType:"Delux Suites",
        roomGuest:4,
        roomBathroom:1,
        roomParking:2,
        roomPet:0
      },
      {
        roomType:"Normal Suites",
        roomGuest:4,
        roomBathroom:1,
        roomParking:2,
        roomPet:0
      },
    ]
}
