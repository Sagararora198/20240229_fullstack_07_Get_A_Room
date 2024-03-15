import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddnewroomServiceService {

  private apiUrl = 'http://localhost:3000'; // The Api for get method of the wallet

  constructor(private http: HttpClient) { }

  posthotel(token: string,newHotelDesc:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };


    return this.http.post(`${this.apiUrl}/hotel`, newHotelDesc,httpOptions);
  }
}
