import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../userservice.service';
import { ActivatedRoute } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-wallet-management',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './wallet-management.component.html',
  styleUrl: './wallet-management.component.css'
})
export class WalletManagementComponent implements OnInit {
  Users: {username: string, userWalletMoney: number, tempWalletMoney?: number}[] = [];

      constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private http: HttpClient,) { }

      ngOnInit() {
        this.fetchUsers();
      }

      fetchUsers(): void {
        this.userService.getUsers().subscribe({
          next: (data) => {
            this.Users = data;
            console.log(this.Users);

          },
          error: (error) => {
            console.error('There was an error!', error);
          }
        });
      }

  incrementMoney(userIndex: number): void {
    if (this.Users[userIndex].tempWalletMoney === undefined) {
      this.Users[userIndex].tempWalletMoney = this.Users[userIndex].userWalletMoney;
    }
    this.Users[userIndex].tempWalletMoney! += 100; // Increment by 100
  }

  decrementMoney(userIndex: number): void {
    if (this.Users[userIndex].tempWalletMoney === undefined) {
      this.Users[userIndex].tempWalletMoney = this.Users[userIndex].userWalletMoney;
    }
    if(this.Users[userIndex].tempWalletMoney!<=0){
      this.Users[userIndex].tempWalletMoney! = 0
    }
    else{
      this.Users[userIndex].tempWalletMoney! -= 100; // Decrement by 100 or any other value you prefer
    }
  }

  }



  // Users:{username:String,userWalletMoney:number,tempWalletMoney?:number}[]=[
  //   {
  //     username:"User 1",
  //     userWalletMoney:1000
  //   },
  //   {
  //     username:"User 2",
  //     userWalletMoney:500
  //   },
  // ]

  // saveMoney(userIndex: number): void {
  //   if (this.Users[userIndex].tempWalletMoney !== undefined) {
  //     this.Users[userIndex].userWalletMoney = this.Users[userIndex].tempWalletMoney!;
  //     delete this.Users[userIndex].tempWalletMoney; // Clean up the temporary state
  //   }
  // }
