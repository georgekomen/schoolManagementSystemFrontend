import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';
import {School} from '../../school-list/school-list-datasource';

@Injectable()
export class SchoolService {
  constructor(
    private http: BaseHttpService<any>,
    private configService: ConfigService,
  ) {
  }


  getSchools(): Observable<School[]> {
    return this.http.get(`${this.configService.baseUrl}/school/get_schools`);
  }

  postSchool(school: School): Observable<School> {
    return this.http.post(`${this.configService.baseUrl}/school/new_school`, school);
  }

}
