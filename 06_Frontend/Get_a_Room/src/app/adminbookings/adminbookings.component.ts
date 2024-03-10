import { Component } from '@angular/core';
import { BookingsboxComponent } from '../layout/bookingsbox/bookingsbox.component';
@Component({
  selector: 'app-adminbookings',
  standalone: true,
  imports: [BookingsboxComponent],
  templateUrl: './adminbookings.component.html',
  styleUrl: './adminbookings.component.css'
})
export class AdminbookingsComponent {
  upcomingBookings:{hotelname:String,hotelImg:String,checkinDate:String,duration:String,amount:String,guests:String}[]=[
    {
      hotelname:"Pride Inn",
      hotelImg:"asd",
      checkinDate:"12 Mar 2024",
      duration:"Long (2-days)",
      amount:"1100",
      guests:"4 adults",
    },
    {
      hotelname:"Pride Inn",
      hotelImg:"asd",
      checkinDate:"12 Mar 2024",
      duration:"Long (2-days)",
      amount:"1100",
      guests:"4 adults",
    },
  ]
}
