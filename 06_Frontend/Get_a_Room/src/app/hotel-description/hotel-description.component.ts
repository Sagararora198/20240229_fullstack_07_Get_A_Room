import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RoomdetailsComponent } from '../roomdetails/roomdetails.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hotel-description',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule,RoomdetailsComponent],
  templateUrl: './hotel-description.component.html',
  styleUrl: './hotel-description.component.css'
})


export class HotelDescriptionComponent implements OnInit {

  hotel: any; // Define the type of your hotel data
  roomTypes: any[] = []; // Array to store room types
  fetchedRooms: any[] = []; // Array to store fetched rooms
  roomDatas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
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
          // console.log("hotel room :" + hotel.rooms);
          // console.log(this.hotel); // Print all data in the console
          // console.log(hotelId);
          this.fetchedRooms = [];

          // Iterate over the rooms array and push each element into fetchedRooms array
          hotel.rooms.forEach((room: any) => {
            this.fetchedRooms.push(room);
          });
          console.log(this.fetchedRooms);
          this.getRoomsByTypes(this.fetchedRooms);

          // return hotel.rooms

        });
    }

  }

  // showRoomDetails() {
  //   // Your functionality goes here
  //   console.log('Room details clicked');
  //   // For example, navigate to another view, display a modal, fetch data, etc.
  // }


  //getting data of rooms
  getRoomsByTypes(roomTypeIds: any[]): void {
    // Iterate over each room type ID
    roomTypeIds.forEach((roomTypeId: any) => {
      // Make an HTTP request for each room type ID
      console.log(roomTypeId);
      this.http.get(`http://localhost:3000/rooms/by-types?roomTypeIds=${roomTypeId}`)
        .subscribe((rooms: any) => {
          // Handle the fetched rooms data as needed
          console.log('rooms:',rooms);
          if (rooms) {
            rooms.forEach((room: any) => {
              // Process each room data
              console.log("hello");
              this.getRoomData(room._id);
            });
          } else {
            console.log("No rooms found for the provided room type ID:", roomTypeId);
          }
        }, error => {
          console.error("Error fetching rooms by types:", error);
          // Handle error
        });
    });
  }


  //single fetch

  getRoomData(roomId: string): any {
    this.http.get(`http://localhost:3000/room/${roomId}`).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.roomDatas = data;
        } else {
          // Handle the case where a single object is received
          this.roomDatas.push(data);
        }
        // console.log("yeh single" + data.roomType);

      }
    );
  }

  naviagteroomdetail(){
    this.router.navigate(['/roomdetail'])
  }

}
