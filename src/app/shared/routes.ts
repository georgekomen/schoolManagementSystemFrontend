import { Routes } from '@angular/router';
import {LogInComponent} from "../log-in/log-in.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {SchoolListComponent} from '../school/school-list/school-list.component';
import {AddSchoolComponent} from '../school/school-list/add-school/add-school-.component';
import {PermissionListComponent} from '../auth/permission-list/permission-list.component';
import {AddPermissionComponent} from '../auth/permission-list/add-permission/add-permission.component';
import {UserListComponent} from '../users/user-list/user-list.component';
import {UserDetailsComponent} from '../users/user-list/user-details/user-details.component';
import {UserGrantsComponent} from '../users/user-list/user-grants/user-grants.component';
import {CourseListComponent} from '../course/course-list/course-list.component';
import {AddCourseComponent} from '../course/course-list/add-course/add-course.component';
import {AddClassComponent} from '../class1/class-list/add-class/add-class.component';
import {ClassListComponent} from '../class1/class-list/class-list.component';
import {RegionComponent} from '../region/region/region.component';
import {AddCountyComponent} from '../region/add-county/add-county.component';
import {SubCountyListComponent} from '../region/sub-county-list/sub-county-list.component';
import {AddSubCountyComponent} from '../region/add-sub-county/add-sub-county.component';


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
    path: 'add-school',
    component: AddSchoolComponent,
    pathMatch: 'full'
  },
  {
    path: 'grant-list',
    component: UserGrantsComponent,
    pathMatch: 'full'
  },
  {
    path: 'school-list',
    component: SchoolListComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-user',
    component: UserDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-class',
    component: AddClassComponent,
    pathMatch: 'full'
  },
  {
    path: 'class-list',
    component: ClassListComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-list',
    component: UserListComponent,
    pathMatch: 'full'
  },
  {
    path: 'permission-list',
    component: PermissionListComponent,
    pathMatch: 'full'
  },
  {
    path: 'course-list',
    component: CourseListComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-permission',
    component: AddPermissionComponent,
    pathMatch: 'full'
  },
  {
    path: 'region-list',
    component: RegionComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-county',
    component: AddCountyComponent,
    pathMatch: 'full'
  },
  {
    path: 'subcounty-list',
    component: SubCountyListComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-subcounty',
    component: AddSubCountyComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'course-list'
  }
];
