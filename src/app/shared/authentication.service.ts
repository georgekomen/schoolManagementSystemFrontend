import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../../config/ConfigService';
import { BaseHttpService } from '../../shared/base.http.service';
import { LoaderService } from '../../shared/loader.service';
import { User } from './user';

@Injectable()
export class AuthenticationService {
  protected loginUrl: string;

  constructor(
    private http: BaseHttpService<any>,
    private loader: LoaderService,
    protected configService: ConfigService,
  ) {
    this.loginUrl = `${configService.userUrl}/login`;
  }

  login(username: string, password: string): Observable<User> {
    this.loader.on();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {username: username, password: password};
    return this.http.post(`${this.configService.userUrl}/login`, body, httpOptions)
      .pipe(
        map((user: any) => {
          this.loader.off();
          return user;
        })
      );
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
