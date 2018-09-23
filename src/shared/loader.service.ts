import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pendingRequests = 0;

  constructor() {
  }

  on() {
    if (this.pendingRequests === 0) {
      this.loading.next(true);
    }
    this.pendingRequests++;
  }

  off() {
    this.pendingRequests = 0;
    this.loading.next(false);
  }
}
