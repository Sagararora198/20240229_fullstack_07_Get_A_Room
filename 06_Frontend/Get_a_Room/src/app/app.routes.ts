import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'login',component:LoginComponent}
];
