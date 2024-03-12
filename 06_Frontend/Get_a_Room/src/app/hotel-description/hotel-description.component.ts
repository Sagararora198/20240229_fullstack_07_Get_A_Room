import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-description',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , CommonModule],
  templateUrl: './hotel-description.component.html',
  styleUrl: './hotel-description.component.css'
})


export class HotelDescriptionComponent implements OnInit {

  hotel: any; // Define the type of your hotel data

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getHotelDetails();
  }
  getHotelDetails(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.http.get(`http://localhost:3000/hotel/find/${hotelId}`)
        .subscribe((hotel: any) => {
          this.hotel = hotel;
          console.log("hotel name :"+hotel.hotelName);

          console.log(this.hotel); // Print all data in the console
        });
    }
  }

  // showRoomDetails() {
  //   // Your functionality goes here
  //   console.log('Room details clicked');
  //   // For example, navigate to another view, display a modal, fetch data, etc.
  // }


  hotelDesc: { hotelName: String, hotelDesc: String, hotelImages: { image: String }[] } =
    {
      hotelName: "umesh",
      hotelDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      hotelImages: [
        { image: "../assets/public/featherheart.svg" },
        { image: "../assets/public/featherheart.svg" },
        { image: "../assets/public/featherheart.svg" },
      ]
    }

  roomTypes: { roomType: String, roomGuest: Number, roomBathroom: Number, roomParking: Number, roomPet: Number }[] = [
    {
      roomType: "Super Delux Suites",
      roomGuest: 4,
      roomBathroom: 1,
      roomParking: 2,
      roomPet: 0
    },
    {
      roomType: "Delux Suites",
      roomGuest: 4,
      roomBathroom: 1,
      roomParking: 2,
      roomPet: 0
    },
    {
      roomType: "Normal Suites",
      roomGuest: 4,
      roomBathroom: 1,
      roomParking: 2,
      roomPet: 0
    },
  ]
}
