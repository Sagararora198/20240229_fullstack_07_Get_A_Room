import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../userservice.service';
import { ActivatedRoute } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';



@Component({
  selector: 'app-wallet-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-management.component.html',
  styleUrl: './wallet-management.component.css'
})


export class WalletManagementComponent implements OnInit {
  // Users: any[] = [];
  Users:{name:String,wallet:number,tempWalletMoney?:number}[]=[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData(): void {
    const token = localStorage.getItem('jwtToken'); // Assuming the token is stored with this key
    if (token) {
      this.userService.getUsers(token).subscribe({
        next: (data) => {
          this.Users = data;
          console.log("DATA ",this.Users);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    } else {
      console.error('JWT token not found in local storage.');
    }
  }


      //   {
      //     username:"User 1",
      //     userWalletMoney:1000
      //   },
      //   {
      //     username:"User 2",
      //     userWalletMoney:500
      //   },
      // ]

      trackByUsername(index: number, user: any): string {
        return user ? user.username : null;
      }

    incrementMoney(userIndex: number): void {
      if (this.Users[userIndex].tempWalletMoney === undefined) {
      this.Users[userIndex].tempWalletMoney = this.Users[userIndex].wallet;
    }
    this.Users[userIndex].tempWalletMoney! += 100; // Increment by 100
  }

  decrementMoney(userIndex: number): void {
    if (this.Users[userIndex].tempWalletMoney === undefined) {
      this.Users[userIndex].tempWalletMoney = this.Users[userIndex].wallet;
    }
    if(this.Users[userIndex].tempWalletMoney!<=0){
      this.Users[userIndex].tempWalletMoney! = 0
    }
    else{
      this.Users[userIndex].tempWalletMoney! -= 100; // Decrement by 100 or any other value you prefer
    }
  }

  saveMoney(userIndex: number): void {
    if (this.Users[userIndex].tempWalletMoney !== undefined) {
      this.Users[userIndex].wallet = this.Users[userIndex].tempWalletMoney!;
      delete this.Users[userIndex].tempWalletMoney; // Clean up the temporary state
    }
  }

  }



