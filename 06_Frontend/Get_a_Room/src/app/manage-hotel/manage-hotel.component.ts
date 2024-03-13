import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../hotel.service';
import { AddNewHotelComponent } from '../add-new-hotel/add-new-hotel.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-hotel',
  standalone: true,
  imports: [CommonModule,AddNewHotelComponent],
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.css'] // Corrected to styleUrls
})
export class ManageHotelComponent implements OnInit {
  hotelsArray: { hotelName: string, address: string }[] = [];

  constructor(private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadHotelData();
  }

  loadHotelData(): void {
    const token = localStorage.getItem('jwtToken'); // Assuming the token is stored with this key
    if (token) {
      this.hotelService.getHotel(token).subscribe({
        next: (data) => {
          this.hotelsArray = data;
          console.log("Hotels Data: ", this.hotelsArray);
        },
        error: (error) => {
          console.error('There was an error fetching hotels:', error);
        }
      });
    } else {
      console.error('JWT token not found in local storage.');
    }
  }

  NavigateToNewHotel(): void {
    this.router.navigate(['/AddNewHotelComponent']);
  }
}
