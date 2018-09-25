import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/ConfigService';
import { LoaderService } from '../../shared/loader.service';
import { NotificationService } from '../../shared/notification.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { User } from '../shared/Models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-provider-log-in',
  templateUrl: './provider-log-in.component.html',
  styleUrls: ['./provider-log-in.component.css']
})
export class ProviderLogInComponent implements OnInit, AfterViewInit {
  public username: string;

  public password: string;

  constructor(
    private authenticationService: AuthenticationService,
    private loader: LoaderService,
    public configService: ConfigService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  login(): void {
    console.log(this.username, this.password);
    this.authenticationService.login(this.username, this.password).subscribe(
      (user: User) => {

      },
      error => {
        this.loader.off();

        this.notificationService.error(
          'notification.error',
          'login.bad_credentials'
        );
      },
    );
  }
}

