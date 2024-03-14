import { Component } from '@angular/core';
import { AddnewroomServiceService } from './addnewroom-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-room.component.html',
  styleUrl: './admin-room.component.css'
})
export class AdminRoomComponent {


  constructor(private AddnewroomServiceService:AddnewroomServiceService) { }

  hotelName=""
  phoneNumber:string=""
  roomType:string=""
  hotelAddress:string=""
  // hotelPhotos: any = {};
  hotelAmenities:string=""
  managedBy:string=""

  hotelPhotosInput: string = ""; // This will hold the raw input
  hotelPhotos: any = {}; // This will hold the processed photos object

  hotelDesc:{hotelName:string,phoneNumber:string,roomType:string,hotelAddress:string,hotelPhotos:string,hotelAmenities:string, managedBy:string}[]=[]

  addRoom(){
    console.log("add Room CLikecd");

    const newHotelDesc = {
      hotelName: this.hotelName,
      phoneNumber: this.phoneNumber,
      roomTypes: this.roomType,
      hotelAddress: this.hotelAddress,
      hotelPhotos: this.hotelPhotos,
      hotelAmenities:this.hotelAmenities,
      managedBy:this.managedBy
    };

    const token = localStorage.getItem('jwtToken');
    if (token) {
      console.log(token);

      this.AddnewroomServiceService.posthotel(token, newHotelDesc).subscribe({
        next: (response) => {
          console.log('Data posted successfully', response);
        },
        error: (error) => {
          console.error('Error posting data', error);
        }
      })
    }

  }
}
