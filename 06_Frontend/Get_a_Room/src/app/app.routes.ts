import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import {PropertiesComponent} from './properties/properties.component'
import { SignupComponent } from './signup/signup.component';
import { SearchResultsComponent } from './search-results/search-results.component';
=======
import { SignupComponent } from './signup/signup.component';
>>>>>>> eddb87a8acf0d09abf69d884af146b427827d51d


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'login',component:LoginComponent},
<<<<<<< HEAD
  {path:'properties',component:PropertiesComponent},
  {path:'signup',component:SignupComponent},
  {path:'searchresult',component:SearchResultsComponent}
=======
  {path:'signup',component:SignupComponent}
>>>>>>> eddb87a8acf0d09abf69d884af146b427827d51d
];
