// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000'; // The Api for get method of the wallet


  constructor(private http: HttpClient) { }

  getUsers(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.apiUrl}/wallet`, httpOptions);
  }

  updateWallet(userId: string, amountToAdd: number,token:string): Observable<any> {
    // Adjusting the body to match the provided structure
    const body = {
      "userId": userId,
      "amountToAdd": amountToAdd
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put('http://localhost:3000/addMoney', body,httpOptions);
  }

}

