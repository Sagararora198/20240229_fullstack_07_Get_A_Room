import { Component } from '@angular/core';

@Component({
  selector: 'app-wallet-management',
  standalone: true,
  imports: [],
  templateUrl: './wallet-management.component.html',
  styleUrl: './wallet-management.component.css'
})
export class WalletManagementComponent {
  WalletMoney:Number=0;
  Users:{username:String,userWalletMoney:Number}[]=[
    {
      username:"User 1",
      userWalletMoney:1000
    },
    {
      username:"User 2",
      userWalletMoney:500
    },
  ]
}
