import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  userData: { firstName: String, lastName: String, address: String, apartment: String, city: String, country: String, zipCode: Number } =
    {
      firstName: 'as',
      lastName: "as",
      address: 'asdcsdv',
      apartment: "aytrh",
      city: "Hyderabaad",
      country: "India",
      zipCode: 123229
    }
  bookingDetails: { hotelName: String, roomType: String, guests: Number, amount: Number } = {
    hotelName: "as",
    roomType: "asc",
    guests: 2,
    amount: 1000
  }

  constructor ( private router : Router){}

  bookingdone() {
    this.router.navigate(['/confirmation'])
  }
  firstName: string = '';
  lastName: string = '';
  streetName: string = '';
  city: string = '';
  country: string = '';
  selectedCity: string = '';
  zipcode: string = '';

  onSubmit() {
    console.log('Form Submitted!');
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Street Name:', this.streetName);
    console.log('City:', this.city);
    console.log('Country:', this.country);
    console.log('Selected City:', this.selectedCity);
    console.log('Zipcode:', this.zipcode);
  }

}
