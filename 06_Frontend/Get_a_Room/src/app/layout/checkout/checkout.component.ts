import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  userData:{firstName:String,lastName:String,address:String,apartment:String,city:String,country:String,zipCode:Number}=
    {
      firstName:'as',
      lastName:"as",
      address:'asdcsdv',
      apartment:"aytrh",
      city:"Hyderabaad",
      country:"India",
      zipCode:123229
    }
  bookingDetails:{hotelName:String,roomType:String,guests:Number,amount:Number}={
    hotelName:"as",
    roomType:"asc",
    guests:2,
    amount:1000
  }

}
