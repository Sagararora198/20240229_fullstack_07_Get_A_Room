import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-hotel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-hotel.component.html',
  styleUrl: './add-new-hotel.component.css'
})
export class AddNewHotelComponent {
hotelDesc:{hotelName:string,phonenumber:string}[]=[]
hotelName="Pride Inn"
}
