import { Component } from '@angular/core';

@Component({
  selector: 'app-wallet-management',
  standalone: true,
  imports: [],
  templateUrl: './wallet-management.component.html',
  styleUrl: './wallet-management.component.css'
})
export class WalletManagementComponent {
  
  
  Users:{username:String,userWalletMoney:number,tempWalletMoney?:number}[]=[
    {
      username:"User 1",
      userWalletMoney:1000
    },
    {
      username:"User 2",
      userWalletMoney:500
    },
  ]
  incrementMoney(userIndex: number): void {
    if (this.Users[userIndex].tempWalletMoney === undefined) {
      this.Users[userIndex].tempWalletMoney = this.Users[userIndex].userWalletMoney;
    }
    this.Users[userIndex].tempWalletMoney! += 100; // Increment by 100 or any other value you prefer
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

  // saveMoney(userIndex: number): void {
  //   if (this.Users[userIndex].tempWalletMoney !== undefined) {
  //     this.Users[userIndex].userWalletMoney = this.Users[userIndex].tempWalletMoney!;
  //     delete this.Users[userIndex].tempWalletMoney; // Clean up the temporary state
  //   }
  // }
}
