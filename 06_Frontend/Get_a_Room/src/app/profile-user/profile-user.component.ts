import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent {
  walletMoney:String="₹ 100000"
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
