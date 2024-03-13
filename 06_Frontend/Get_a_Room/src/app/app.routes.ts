import { NgModule } from '@angular/core'
//add
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
// import {PropertiesComponent} from './properties/properties.component'
import { SignupComponent } from './signup/signup.component';
// import { PropertiesComponent } from './properties/properties.component';
import { HotelDescriptionComponent } from './hotel-description/hotel-description.component';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { PropertiesComponent } from './properties/properties.component';
import { AddNewHotelComponent } from './add-new-hotel/add-new-hotel.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ManageHotelComponent } from './manage-hotel/manage-hotel.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';
import { CheckoutComponent } from './layout/checkout/checkout.component';
import { ConfirmationComponent } from './layout/confirmation/confirmation.component';
import { AddNewHotelRoomproperty1Component } from './add-new-hotel-roomproperty1/add-new-hotel-roomproperty1.component';
import { HotelAddedSuccessComponent } from './hotel-added-success/hotel-added-success.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNewHotelRoomproperty2Component } from './add-new-hotel-roomproperty2/add-new-hotel-roomproperty2.component';
import { AddNewHotelRoomproperty3Component } from './add-new-hotel-roomproperty3/add-new-hotel-roomproperty3.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'properties', component: PropertiesComponent },
  // { path: 'hoteldesc', component: HotelDescriptionComponent },
  { path: 'hoteldesc/:id', component: HotelDescriptionComponent },
  { path: 'roomdetail', component: RoomdetailsComponent },
  { path: 'walletmanage', component: WalletManagementComponent },
  { path: 'profile', component: ProfileUserComponent },
  { path: 'manageHotel', component: ManageHotelComponent },
  { path: 'bookings', component: AdminbookingsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  {path:'AddNewHotelComponent',component:AddNewHotelComponent},
  { path: 'addNewHotelProperty1', component: AddNewHotelRoomproperty1Component },
  { path: 'hoteladdedsuccess', component: HotelAddedSuccessComponent },
  { path: 'notification', component: NotificationsComponent },
  { path: 'addNewHotelProperty2', component: AddNewHotelRoomproperty2Component },
  { path: 'addNewHotelProperty3', component: AddNewHotelRoomproperty3Component },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
