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
  // defining the user
  Users:{_id:string,name:string,wallet:number,tempWalletMoney:number}[]=[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  //getting the user's Name and wallet amount
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

      // trackByUsername(index: number, user: any): string {
      //   return user ? user.username : null;
      // }

      incrementMoney(index: number): void {
        const user = this.Users[index];
        if (!user) {
          console.error('User not found at index', index);
          return;
        }

        // If tempWalletMoney is undefined, initialize it with the current wallet amount
        if (user.tempWalletMoney === undefined) {
          user.tempWalletMoney = user.wallet;
        }

        // Increment tempWalletMoney by a fixed amount, e.g., 100
        user.tempWalletMoney += 100;

        // Optionally, you can also update the user's data on the server or in local storage here
      }

      decrementMoney(index: number): void {
        const user = this.Users[index];
        if (!user) {
          console.error('User not found at index', index);
          return;
        }

        // If tempWalletMoney is undefined, initialize it with the current wallet amount
        if (user.tempWalletMoney === undefined) {
          user.tempWalletMoney = user.wallet;
        }

        // Decrement tempWalletMoney by a fixed amount, e.g., 100
        user.tempWalletMoney -= 100;

        // Optionally, you can also update the user's data on the server or in local storage here
      }

addMoneyToUserWallet(index: number): void {
  const token = localStorage.getItem('jwtToken'); // Assuming the token is stored with this key

  if (!token) {
    console.error('JWT token not found in local storage.');
    return;
  }

  const user = this.Users[index];
  if (!user) {
    console.error('User not found at index', index);
    return;
  }
  console.log(user.tempWalletMoney)

  // Assuming the userId is stored in user.id and amountToAdd is the amount you want to add
  this.userService.updateWallet(user._id, user.tempWalletMoney, token).subscribe({
    next: () => {
      console.log('Amount added successfully');
      // You might want to refresh the user data here to reflect the updated wallet amount
      this.loadUserData();
    },
    error: (error) => {
      console.error('Error adding amount to wallet', error);
    }
  });
}
  }



