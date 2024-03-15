import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  fetchBookingdata(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Adjust the URL based on your API endpoint for fetching bookings
    return this.http.get(`${this.apiUrl}/booking`, { headers });
  }

  deletebookin(_id:string):Observable<any>{

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('No token found');
    }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return  this.http.delete(`${this.apiUrl}/booking/${_id}`, { headers });
}
}




