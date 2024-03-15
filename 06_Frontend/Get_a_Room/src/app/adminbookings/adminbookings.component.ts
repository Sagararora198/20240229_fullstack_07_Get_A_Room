import { Component, OnInit, Output } from '@angular/core';
import { BookingsboxComponent } from '../layout/bookingsbox/bookingsbox.component';
import { BookingService } from './booking.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminbookings',
  standalone: true,
  imports: [BookingsboxComponent],
  templateUrl: './adminbookings.component.html',
  styleUrl: './adminbookings.component.css'
})
export class AdminbookingsComponent implements OnInit {
cancelReservation($event: Event) {
throw new Error('Method not implemented.');
}
@Output() upcomingBookings:{ bookingDate:string,bookedBy:string,bookedRoom:string,checkinDate:string,checkoutDate:string,paymentDetails:string}[]=[]
    // {
    //   hotelname:"Pride Inn",
    //   hotelImg:"asd",
    //   checkinDate:"12 Mar 2024",
    //   duration:"Long (2-days)",
    //   amount:"1100",
    //   guests:"4 adults",
    // },
    // {
    //   hotelname:"Pride Inn",
    //   hotelImg:"asd",
    //   checkinDate:"12 Mar 2024",
    //   duration:"Long (2-days)",
    //   amount:"1100",
    //   guests:"4 adults",
    // },
  //]

  // hotelname:string
  // hotelImg:string
  // checkinDate:string
  // duration:string
  // amount:string
  // guests:string


  ngOnInit(): void {
    this.fetchBookingdata()
  }

  constructor(private bookingService: BookingService,
    private http:HttpClient) { }


//fetching the data from the backend
fetchBookingdata(){
  const token= localStorage.getItem('jwtToken')
  if(token){
    if (token) {
      this.bookingService.fetchBookingdata().subscribe({
        next: (data) => {
          this.upcomingBookings=data
          // Handle the booking data
          console.log(this.upcomingBookings);

      },
        error: (error) => {
          console.error('Error fetching booking data:', error);
          // Handle any errors, such as by displaying an error message to the user
        }
      });
    } else {
      console.error('No token found');
      // Handle the case where there is no token, such as redirecting to a login page
    }
  }

  // this.cancelReservation() {
  //   console.log('Reservation cancelled:', );
  //   // Add your logic here to handle the cancellation
  // }

}

}
