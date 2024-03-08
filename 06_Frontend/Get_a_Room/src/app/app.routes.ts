import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import {PropertiesComponent} from './properties/properties.component'
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path:'login',component:LoginComponent},
  {path:'properties',component:PropertiesComponent},
  {path:'search',component:SearchComponent}
];
