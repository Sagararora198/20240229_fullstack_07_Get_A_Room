import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ConfirmationComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
  
  }

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




  bookingdone(){
    this.router.navigate(['/confirmation'])
  }

}
