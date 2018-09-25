import { Routes } from '@angular/router';
import {LogInComponent} from "../log-in/log-in.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {SchoolListComponent} from '../school-list/school-list.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'school-list',
    component: SchoolListComponent,
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'school-list'}
];
