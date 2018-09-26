import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import {FingerprintVerificationComponent} from "./fingerprint-verification/fingerprint-verification.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ConfigService} from "../config/ConfigService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BaseHttpService} from "../shared/base.http.service";
import {NotificationService} from "../shared/notification.service";
import {ToastrModule} from "ngx-toastr";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoaderService} from "../shared/loader.service";
import {RouterModule} from "@angular/router";
import {routes} from "./shared/routes";
import {FormsModule} from "@angular/forms";
import { AuthenticationService } from './shared/services/authentication.service';
import { UserService } from './shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SchoolControllerComponent } from './school/school-list/school-controller/school-controller.component';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule,
  MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatRadioModule, MatSelectModule, MatNativeDateModule,
  MatDatepickerModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatTabsModule
} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolListComponent } from './school/school-list/school-list.component';
import {SchoolService} from './shared/services/SchoolService';
import {CommonModule} from '@angular/common';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-list/user-details/user-details.component';
import { PermissionListComponent } from './auth/permission-list/permission-list.component';
import { AddPermissionComponent } from './auth/permission-list/add-permission/add-permission.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    FingerprintVerificationComponent,
    SchoolControllerComponent,
    MainNavComponent,
    DashboardComponent,
    SchoolListComponent,
    UserListComponent,
    UserDetailsComponent,
    PermissionListComponent,
    AddPermissionComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule

  ],
  providers: [
    ConfigService,
    BaseHttpService,
    NotificationService,
    LoaderService,
    AuthenticationService,
    UserService,
    SchoolService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
