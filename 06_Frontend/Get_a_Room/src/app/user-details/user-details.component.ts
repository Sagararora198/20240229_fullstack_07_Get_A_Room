import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

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

}


// this.http.get<any>('http://localhost:3000/profile').subscribe(