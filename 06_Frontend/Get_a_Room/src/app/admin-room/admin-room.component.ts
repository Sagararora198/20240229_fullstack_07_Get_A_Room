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
    const newHotelDesc = {
      hotelName: this.hotelName,
      phoneNumber: this.phoneNumber,
      roomTypes: this.selectedRooms,
      hotelAddress: this.hotelAddress,
      hotelPhotos: this.hotelPhotoss,
      hotelAmenities:this.hotelAmenities,
      managedBy:this.managedBy
    };
    console.log("Data ",newHotelDesc);
    
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

  hotelPhotoss: { [key: string]: string } = {};

  newPhoto: string = '';

  addPhoto() {
    if(!this.newPhoto){
      console.log("Empty");
      return;
    }
      const nextKey = 'photo' + (Object.keys(this.hotelPhotoss).length + 1);
      this.hotelPhotoss[nextKey] = this.newPhoto;
      this.newPhoto = '';
      console.log(this.hotelPhotoss);
      
  }
  singleChecked: boolean = false;
  doubleChecked: boolean = false;
  suiteChecked: boolean = false;
  selectedRooms: string[] = [];

  addToSelectedRooms(roomType: string) {
    if (!this.selectedRooms.includes(roomType)) {
      this.selectedRooms.push(roomType);
    }
    console.log('Selected Rooms:', this.selectedRooms);
  }

  removeFromSelectedRooms(roomType: string) {
    const index = this.selectedRooms.indexOf(roomType);
    if (index !== -1) {
      this.selectedRooms.splice(index, 1);
    }
    console.log('Selected Rooms:', this.selectedRooms);
  }


}
