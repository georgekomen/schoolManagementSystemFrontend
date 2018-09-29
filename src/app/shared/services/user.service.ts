import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';
import {User} from '../Models/user';
import {Grant} from '../Models/grant';

@Injectable()
export class UserService {
  constructor(
    private http: BaseHttpService<any>,
    private configService: ConfigService,
  ) {
  }


  getUsers(): Observable<User[]> {
    return this.http.get(`${this.configService.baseUrl}/user/get_users`);
  }

  getUserGrants(user: User): Observable<Grant[]> {
    return this.http.get(`${this.configService.baseUrl}/auth/get_user_grants/${user.id}`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post(`${this.configService.baseUrl}/user/new_user`, user);
  }

}
