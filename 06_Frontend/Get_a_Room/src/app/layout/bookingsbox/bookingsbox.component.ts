import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bookingsbox',
  standalone: true,
  imports: [],
  templateUrl: './bookingsbox.component.html',
  styleUrl: './bookingsbox.component.css'
})
export class BookingsboxComponent {
  @Input() booking:{hotelname:String,hotelImg:String,checkinDate:String,duration:String,amount:String,guests:String}={
    hotelname:"Pride Inn",
    hotelImg:"asd",
    checkinDate:"12 Mar 2024",
    duration:"Long (2-days)",
    amount:"1100",
    guests:"4 adults",
  }
}
