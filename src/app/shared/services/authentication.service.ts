import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';
import { LoaderService } from '../../../shared/loader.service';
import { User } from '../Models/user';
import {Permission} from '../Models/permission';
import {School} from '../Models/school';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: BaseHttpService<any>,
    private loader: LoaderService,
    protected configService: ConfigService,
  ) {

  }

  login(username: string, password: string): Observable<User> {
    this.loader.on();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {username: username, password: password};
    return this.http.post(`${ConfigService.baseUrl}/auth/login`, body, httpOptions)
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

  getPermissions(): Observable<Permission[]> {
    return this.http.get(`${ConfigService.baseUrl}/auth/get_permissions`);
  }

  postPermission(permission: Permission): Observable<Permission> {
    return this.http.post(`${ConfigService.baseUrl}/auth/new_permission`, permission);
  }
}
