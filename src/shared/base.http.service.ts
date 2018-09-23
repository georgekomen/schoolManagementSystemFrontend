import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,  throwError as _throw } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Slice } from '../slice';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

@Injectable()
export class BaseHttpService<T extends any> {
  constructor(
    private notificationService: NotificationService,
    private loader: LoaderService,
    protected http: HttpClient,
    protected router: Router) {
  }

  request(method: string, url: string, options?: any): Observable<any> {
    this.turnOnSpinner();

    options = this.getAuthHeaders(options, true);
    options.responseType = 'json';

    return this.http
      .request<T>(method, url, options)
      .pipe(
        map(value => {
          this.turnOffSpinner();
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  request_no_auth(method: string, url: string, options?: any): Observable<any> {
    return this.http
      .request<T>(HttpMethod.GET, url, options)
      .pipe(
        map(value => {
          this.turnOffSpinner();
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  requestWithoutSpinner(method: string, url: string, options?: any): Observable<any> {
    options = this.getAuthHeaders(options);
    options.responseType = 'json';

    return this.http
      .request<T>(method, url, options)
      .pipe(
        map(value => {
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  get_no_auth(url: string, options?: any): Observable<any> {
    return this.request_no_auth(HttpMethod.GET, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  download_no_auth(url: string, options?: any): Observable<any> {
    this.turnOnSpinner();
    return this.http
      .get(url, {responseType: 'blob'})
      .pipe(
        map(value => {
          this.turnOffSpinner();
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  cleanGet(url: string, options?: any): Observable<any> {
    this.turnOnSpinner();
    return this.request(HttpMethod.GET, url, options)
      .pipe(
        map(value => {
          this.turnOffSpinner();
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  get(url: string, options?: any): Observable<any> {
    return this.request(HttpMethod.GET, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  getWithoutSpinner(url: string, options?: any): Observable<any> {
    return this.requestWithoutSpinner(HttpMethod.GET, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  post(url: string, body: any, options?: any): Observable<any> {
    options = options || {};
    options.body = JSON.stringify(body);
    return this.request(HttpMethod.POST, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  upload(url: string, body: any, options?: any): Observable<any> {
    this.turnOnSpinner();
    options = this.getUploadAuthHeaders(options);
    options.body = body;

    return this.http
      .request(HttpMethod.POST, url, options)
      .pipe(
        map((res: any) => {
          this.turnOffSpinner();
          return res;
        }),
        catchError(this.catchAuthError())
      );
  }

  download(url: string, options?: any): Observable<any> {
    this.turnOnSpinner();
    options = this.getAuthHeaders(options);
    options.responseType = 'blob';

    return this.http
      .get(url, options)
      .pipe(
        map(value => {
          this.turnOffSpinner();
          return value;
        }),
        catchError(this.catchAuthError())
      );
  }

  put(url: string, body: T, options?: any): Observable<any> {
    options = options || {};
    options.body = JSON.stringify(body);

    return this.request(HttpMethod.PUT, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  delete(url: string, options?: any): Observable<any> {
    return this.request(HttpMethod.DELETE, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  deleteObject(url: string, body: T, options?: any): Observable<any> {
    options = options || {};
    options.body = JSON.stringify(body);

    return this.request(HttpMethod.DELETE, url, options)
      .pipe(catchError(this.catchAuthError()));
  }

  getPage(url: string, page: number, size: number = 50, search: string = null): Observable<any[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    if (search) {
      params = params.set('searchTerm', search);
    }
    return this.request(HttpMethod.GET, url, {params: params})
      .pipe(catchError(this.catchAuthError()));
  }

  getSlice(
    url: string,
    page: number,
    size: number,
    search: string,
  ): Observable<Slice<any>> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    if (search) {
      params = params.set('searchTerm', search);
    }
    return this.request(HttpMethod.GET, url, { params: params, observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          return new Slice<T>(res.body, res.headers.get('X-Has-Next-Page') === 'true');
        }),
        catchError(this.catchAuthError())
      );
  }

  getCollection(url: string, options?: any): Observable<T[]> {
    return this.request(HttpMethod.GET, url, options)
      .pipe(catchError(this.catchAuthError())
      );
  }

  turnOnSpinner() {
    this.loader.on();
  }

  turnOffSpinner() {
    this.loader.off();
  }

  private getAuthHeaders(options?: any, addContentTypeJsonHeader: boolean = false): any {
    const headers = addContentTypeJsonHeader ? new HttpHeaders({
      'Content-Type': 'application/json'
    }) : new HttpHeaders();

    if (!options) {
      options = {
        headers: headers
      };
    } else if (!options.headers) {
      options.headers = headers;
    }

    return options;
  }


  getUploadAuthHeaders(options?: any): any {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (!options) {
      options = {
        headers: headers
      };
    } else if (!options.headers) {
      options.headers = headers;
    }

    return options;
  }

  private catchAuthError() {
    return (res: any) => {
      this.turnOffSpinner();
      if (
        res.status === 401 ||
        res.status === 403 ||
        res.status === 0 /* chrome fix for localhost */
      ) {
        this.notificationService.error('notification.error', `${res.error.error} \n Try to logout then login again`);
      }
      return _throw(res);
    };
  }
}

export const HttpMethod = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options'
};
