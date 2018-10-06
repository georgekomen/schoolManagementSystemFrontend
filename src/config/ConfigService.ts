import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {School} from '../app/shared/Models/school';
import {Course} from '../app/shared/Models/course';

@Injectable()
export class ConfigService {
  public static baseUrl = '';

  public static selectedSchool: School;

  public static schoolList: School[];

  public static courseList: Course[];

  constructor(private http: HttpClient) {
  }

  static load() {
    switch (location.hostname) {
      case 'localhost':
        this.baseUrl = "http://localhost:5000";
        break;

    }
  }
}
