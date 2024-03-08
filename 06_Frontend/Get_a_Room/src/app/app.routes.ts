import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {PropertiesComponent} from './properties/properties.component'
import { SignupComponent } from './signup/signup.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'login',component:LoginComponent},
  {path:'properties',component:PropertiesComponent},
  {path:'signup',component:SignupComponent},
  {path:'searchresult',component:SearchResultsComponent}
];
