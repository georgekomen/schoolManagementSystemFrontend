import { Routes } from '@angular/router';
import {ProviderLogInComponent} from "../provider-log-in/provider-log-in.component";
import {SchoolControllerComponent} from "../school-controller/school-controller.component";
import {AuthenticationControllerComponent} from "../authentication-controller/authentication-controller.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {TableListComponent} from '../table-list/table-list.component';


export const routes: Routes = [
  {
    path: 'login',
    component: ProviderLogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'school-controller',
    component: SchoolControllerComponent,
    pathMatch: 'full'
  },
  {
    path: 'authentication-controller',
    component: AuthenticationControllerComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'table-list',
    component: TableListComponent,
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'login'}
];
