import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PropertiesComponent } from "../properties/properties.component";
import { WalletManagementComponent } from "../wallet-management/wallet-management.component";
import { ManageHotelComponent } from "../manage-hotel/manage-hotel.component";
import { AdminRoomComponent } from "../admin-room/admin-room.component";

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css',
    imports: [CommonModule, PropertiesComponent, WalletManagementComponent, ManageHotelComponent, AdminRoomComponent]
})
export class AdminPanelComponent {

  selectedComponent: string = ''; // Variable to store the selected component

  showComponent(componentName: string): void {
    this.selectedComponent = componentName; // Set the selected component
  
  }
}
