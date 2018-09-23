import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigService {
  public baseUrl = '';

  constructor(private http: HttpClient) {
  }

  load() {
    switch (location.hostname) {
      case 'localhost':
        this.baseUrl = "http://localhost:5000";
        break;

    }
  }
}
