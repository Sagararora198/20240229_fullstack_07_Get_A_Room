import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-roomdetails',
  standalone: true,
  imports: [],
  templateUrl: './roomdetails.component.html',
  styleUrl: './roomdetails.component.css'
})

export class RoomdetailsComponent {
  RoomImage1:string="https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA"

  // constructor(private http: HttpClient) {}



}
