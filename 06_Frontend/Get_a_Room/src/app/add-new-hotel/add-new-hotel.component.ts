import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AddNewHotelRoomproperty2Component } from '../add-new-hotel-roomproperty2/add-new-hotel-roomproperty2.component';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

@Component({
  selector: 'app-add-new-hotel',
  standalone: true,
  imports: [FormsModule,AddNewHotelRoomproperty2Component],
  templateUrl: './add-new-hotel.component.html',
  styleUrl: './add-new-hotel.component.css'
})
export class AddNewHotelComponent implements OnInit {


  hotelName=""
  phoneNumber:string=""
  roomType:string=""
  hotelAddress:string=""
  hotelPhotos:string=""

  hotelDesc:{hotelName:string,phoneNumber:string,roomType:string,hotelAddress:string,hotelPhotos:string,hotelAmenities:string}[]=[]
  constructor(private route: ActivatedRoute,
    private router:Router,
    private http:HttpClient) {}


  ngOnInit() {}

  handleButtonClick() {
    // Functionality to be executed when the button is clicked
    // console.log('Button clicked!');

    // this.router.navigate(['/addNewHotelProperty1'],{
    //   queryParams: { data: JSON.stringify(this.receivedData)
    //   }
    //   })


    // Form the hotelDesc object and push it into the hotelDesc array
    const newHotelDesc = {
      hotelName: this.hotelName,
      phoneNumber: this.phoneNumber,
      roomType: this.roomType,
      hotelAddress: this.hotelAddress,
      hotelPhotos: this.hotelPhotos,
      hotelAmenities:""
    };

    this.hotelDesc.push(newHotelDesc);

    // For demonstration, log the updated hotelDesc array to the console
    console.log(this.hotelDesc);

      console.log('Button clicked!');
      this.router.navigate(['/addNewHotelProperty2'],{queryParams: { data: JSON.stringify(this.hotelDesc)}})
    }
  }

