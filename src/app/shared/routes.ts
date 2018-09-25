import { Routes } from '@angular/router';
import {LogInComponent} from "../log-in/log-in.component";
import {SchoolControllerComponent} from "../school-list/school-controller/school-controller.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {SchoolListComponent} from '../school-list/school-list.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'school-controller',
    component: SchoolControllerComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'table-list',
    component: SchoolListComponent,
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'table-list'}
];
