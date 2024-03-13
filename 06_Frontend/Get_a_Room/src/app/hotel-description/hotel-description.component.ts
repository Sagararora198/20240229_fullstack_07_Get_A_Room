import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-description',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './hotel-description.component.html',
  styleUrl: './hotel-description.component.css'
})


export class HotelDescriptionComponent implements OnInit {

  hotel: any; // Define the type of your hotel data
  roomTypes: any[] = []; // Array to store room types
  fetchedRooms: any[] = []; // Array to store fetched rooms

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
          console.log("hotel room :" + hotel.rooms);
          console.log(this.hotel); // Print all data in the console

          this.getRoomsByTypes(hotel.rooms);

          return hotel.rooms

        });
    }

  }

  // showRoomDetails() {
  //   // Your functionality goes here
  //   console.log('Room details clicked');
  //   // For example, navigate to another view, display a modal, fetch data, etc.
  // }


  //getting data of rooms
  getRoomsByTypes(roomTypeIds: string): void {

    console.log("print room type:" + roomTypeIds);

    this.http.get(`http://localhost:3000/rooms/by-types?roomTypeIds=${roomTypeIds}`)
      .subscribe((rooms: any) => {
        console.log("Rooms by types:", rooms);
        this.fetchedRooms = rooms; // Assign fetched rooms to a variable

        // Access and log all properties of each room
        if (rooms && rooms.length > 0) {
          rooms.forEach((room: any) => {
            console.log("Room ID:", room._id);
            console.log("Room Type:", room.roomType);
            console.log("Other properties if any:", room); // Log all properties
          });
        } else {
          console.log("No rooms found for the provided room type IDs.");
        }

        // Handle the rooms data as needed
      }, error => {
        console.error("Error fetching rooms by types:", error);
        // Handle error
      });
  }




  // roomTypes: { roomType: String, roomGuest: Number, roomBathroom: Number, roomParking: Number, roomPet: Number }[] = [
  //   {
  //     roomType: "Super Delux Suites",
  //     roomGuest: 4,
  //     roomBathroom: 1,
  //     roomParking: 2,
  //     roomPet: 0
  //   },
  //   {
  //     roomType: "Delux Suites",
  //     roomGuest: 4,
  //     roomBathroom: 1,
  //     roomParking: 2,
  //     roomPet: 0
  //   },
  //   {
  //     roomType: "Normal Suites",
  //     roomGuest: 4,
  //     roomBathroom: 1,
  //     roomParking: 2,
  //     roomPet: 0
  //   },
  // ]
}
