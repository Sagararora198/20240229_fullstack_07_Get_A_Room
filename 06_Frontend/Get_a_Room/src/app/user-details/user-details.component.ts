import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  @ViewChild('phoneNumberInput') phoneNumberInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('aboutInput') aboutInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('locationInput') locationInputRef!: ElementRef<HTMLInputElement>;


  userData: any;

  constructor(private http: HttpClient) { }

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

  //function to save 
  save() {

    const phoneNumber = this.phoneNumberInputRef.nativeElement.value.trim();
    const about = this.aboutInputRef.nativeElement.value.trim();
    const location = this.locationInputRef.nativeElement.value.trim();


    const userData1 = {
      phoneNumber,
      about,
      location
    };

    console.log("data:" + userData1.location);
    this.postUserDetailsToAPI(userData1);

  }


  postUserDetailsToAPI(userData1: any) {

    const token = localStorage.getItem('jwtToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Make an HTTP POST request to the API endpoint
      this.http.post<any>('http://localhost:3000/profileUpdate', userData1, { headers }).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.showSuccessAlert();

        },
        (error) => {
          console.error('Error updating user profile:', error);
           this.showErrorAlert('Failed to update user profile.');

        }
      );
    }



  }

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'User details saved successfully!',
    });
  }


  showErrorAlert(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
  }


}





// this.http.get<any>('http://localhost:3000/profile').subscribe