import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-hotel',
  standalone: true,
  imports: [],
  templateUrl: './manage-hotel.component.html',
  styleUrl: './manage-hotel.component.css'
})
export class ManageHotelComponent {

    hotelsArray:{hotelName:string,address:string}[]=[
    {
    "hotelName":"pride Inn",
    "address":"Madhapur, Hyderabad"
    },
    {
      "hotelName":"Radisson BLU",
      "address":"Khondapur, Hyderabad"
    },
    {
      "hotelName":"Hotel Marriot",
      "address":"Shree Ram Nagar, Hyderabad"
    }
]
}
