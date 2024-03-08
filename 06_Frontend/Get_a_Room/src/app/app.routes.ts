import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import {PropertiesComponent} from './properties/properties.component'
import { SearchComponent } from './search/search.component';
=======
import { SignupComponent } from './signup/signup.component';
>>>>>>> c87554e21ed07421e141f73fb3bc2d0e51225225

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'login',component:LoginComponent},
<<<<<<< HEAD
  {path:'properties',component:PropertiesComponent},
  {path:'search',component:SearchComponent}
=======
  {path:'signup',component:SignupComponent}
>>>>>>> c87554e21ed07421e141f73fb3bc2d0e51225225
];
