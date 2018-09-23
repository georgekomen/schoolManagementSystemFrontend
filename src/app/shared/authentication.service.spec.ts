import { async, getTestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { AuthenticationService } from 'app/authentication/shared/authentication.service';
import { ConfigService } from 'app/config/ConfigService';
import { of } from 'rxjs';
import { BaseHttpServiceMock, ConfigServiceMock, LoaderServiceMock } from '../../../../test/mocks';
import { BaseHttpService } from '../../shared/base.http.service';
import { LoaderService } from '../../shared/loader.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let loader: LoaderService;
  let http: BaseHttpService<any>;
  let mockResponse: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: BaseHttpService, useClass: BaseHttpServiceMock },
        { provide: LoaderService, useClass: LoaderServiceMock },
        { provide: ConfigService, useClass: ConfigServiceMock },
      ],
    });

    const testbed = getTestBed();
    service = testbed.get(AuthenticationService);
    loader = testbed.get(LoaderService);
    http = testbed.get(BaseHttpService);

    spyOn(loader, 'on');
    spyOn(loader, 'off');

  }));

  it('should create a new instance of the service', () => {
    expect(service).toBeDefined();
  });

  it('should login', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    mockResponse = {
      token: 'someToken',
    };
    spyOn(http, 'post').and.returnValue(of(mockResponse));

    service.login('username', 'password').subscribe(res => {

      expect(loader.on).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'someToken');
      expect(res).toEqual(mockResponse);
      expect(http.post).toHaveBeenCalled();

      expect(loader.off).toHaveBeenCalled();
    });
    tick();
  }));

  it('should logout', () => {
    spyOn(localStorage, 'clear');
    spyOn(sessionStorage, 'clear');

    service.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  it('should change password', fakeAsync(() => {
    spyOn(http, 'post').and.returnValue(of({status: 200}));
    service.changePassword('token', 'username', 'password');
    expect(http.post).toHaveBeenCalled();
  }));
});
