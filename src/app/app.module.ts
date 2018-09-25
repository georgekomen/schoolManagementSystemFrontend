import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { SchoolControllerComponent } from './school-list/school-controller/school-controller.component';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule} from "@angular/material";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolListComponent } from './school-list/school-list.component';
import {SchoolService} from './shared/services/SchoolService';

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
    MatSortModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
