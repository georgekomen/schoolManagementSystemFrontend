import { Routes } from '@angular/router';
import {ProviderLogInComponent} from "../provider-log-in/provider-log-in.component";


export const routes: Routes = [
  {

    path: '',
    component: ProviderLogInComponent,
    pathMatch: 'full'
  }
];
