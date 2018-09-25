import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';

@Injectable()
export class UserService {
  constructor(
    private http: BaseHttpService<any>,
    private configService: ConfigService,
  ) {
  }


  getLocation(): Observable<any> {
    return this.http.get_no_auth('http://ip-api.com/json');
  }

  logOut() {
    return localStorage.clear();
  }
}
