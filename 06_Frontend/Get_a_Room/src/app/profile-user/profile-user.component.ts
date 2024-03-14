import { Component, OnInit } from '@angular/core';
import { BookingsboxComponent } from '../layout/bookingsbox/bookingsbox.component';
import { ProfileVerificationComponent } from '../layout/profile-verification/profile-verification.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [BookingsboxComponent, ProfileVerificationComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {

  userData: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get<any>('http://localhost:3000/profile', { headers }).subscribe(
        (response: any) => {
          this.userData = response.userdata;
          console.log("User Data:", this.userData);
        },
        error => {
          console.error("Error fetching profile:", error);
        }
      );
    } else {
      console.error("Token not found in localStorage.");
    }
  }


  // walletMoney:String="₹ 100000"
  upcomingBookings: { hotelname: String, hotelImg: String, checkinDate: String, duration: String, amount: String, guests: String }[] = [
    {
      hotelname: "Pride Inn",
      hotelImg: "asd",
      checkinDate: "12 Mar 2024",
      duration: "Long (2-days)",
      amount: "1100",
      guests: "4 adults",
    },
    {
      hotelname: "Pride Inn",
      hotelImg: "asd",
      checkinDate: "12 Mar 2024",
      duration: "Long (2-days)",
      amount: "1100",
      guests: "4 adults",
    },
  ]



  editProfile() {

    console.log("hello");
    this.router.navigate(['/userdetails']); // Replace 'another-page' with your actual route path

  }
}
