import { async, fakeAsync, getTestBed, TestBed, tick  } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { of } from 'rxjs';
import { BaseHttpServiceMock, ConfigServiceMock } from '../../../../test/mocks';
import { ConfigService } from '../../config/ConfigService';
import { BaseHttpService } from '../../shared/base.http.service';
import { UserService } from './user.service';

describe('AuthenticationService', () => {
  let service: UserService;
  let config: ConfigService;
  let httpService: BaseHttpService<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        { provide: BaseHttpService, useClass: BaseHttpServiceMock},
        { provide: ConfigService, useClass: ConfigServiceMock },
      ],
    });

    const testbed = getTestBed();
    service = testbed.get(UserService);
    config = testbed.get(ConfigService);
    httpService = testbed.get(BaseHttpService);

  }));

  describe('getProviderId', () => {
    it('should get the providerId', () => {
      spyOn(service, 'getProviderDetails').and.returnValue({id: 'someId'});

      expect(service.getProviderId()).toBe('someId');
      expect(service.getProviderDetails).toHaveBeenCalled();
    });

    it('should handle empty result when getting the providerId', () => {
      spyOn(service, 'getProviderDetails').and.returnValue(undefined);

      expect(service.getProviderId()).toBeNull();
      expect(service.getProviderDetails).toHaveBeenCalled();
    });
  });


  it('should get the location', fakeAsync(() => {
    spyOn(httpService, 'get_no_auth').and.returnValue(of('someVal'));

    service.getLocation().subscribe(res => {
      expect(res).toBe('someVal');
      expect(httpService.get_no_auth).toHaveBeenCalledWith('http://ip-api.com/json');
    });
    tick();
  }));

  describe('getAgentId', () => {
    it('should get the agentId', () => {
      spyOn(service, 'getCurrentUser').and.returnValue({agentId: 'someAgent'});
      expect(service.getAgentId()).toBe('someAgent');
      expect(service.getCurrentUser).toHaveBeenCalled();
    });

    it('should handle empty results when getting the agentId', () => {
      spyOn(service, 'getCurrentUser').and.returnValue(undefined);
      expect(service.getAgentId()).toBeNull();
      expect(service.getCurrentUser).toHaveBeenCalled();
    });
  });

  describe('getProviderName', () => {
    it('should get the provider name', () => {
      spyOn(service, 'getProviderDetails').and.returnValue({name: 'someName'});

      expect(service.getProviderName()).toBe('someName');
      expect(service.getProviderDetails).toHaveBeenCalled();
    });

    it('should handle empty result when getting the provider name', () => {
      spyOn(service, 'getProviderDetails').and.returnValue(undefined);

      expect(service.getProviderName()).toBeNull();
      expect(service.getProviderDetails).toHaveBeenCalled();
    });
  });

  describe('getProviderDetails', () => {
    it('should get the provider details', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({name: 'someName'}));

      expect(service.getProviderDetails()).toEqual({name: 'someName'});
      expect(localStorage.getItem).toHaveBeenCalledWith('provider_details');
    });

    it('should handle empty results when getting the provider details', () => {
      spyOn(localStorage, 'getItem').and.returnValue(undefined);

      expect(service.getProviderDetails()).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('provider_details');
    });
  });

  it('should get the user', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of('someUser'));

    service.getUser('someId').subscribe(res => {
      expect(res).toBe('someUser');
      expect(httpService.get).toHaveBeenCalledWith(`${config.programUrl}/beneficiaries/user/someId`);
    });
  }));

  it('should store the data', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    spyOn(service, 'getUser').and.returnValue(of({id: 'someId'}));
    const user = {id: 123, name: 'someName', token: 'someToken'};

    service.storeData(user, user.name);
    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', user.token);
    expect(localStorage.setItem).toHaveBeenCalledWith('id', user.id.toString());
    expect(localStorage.setItem).toHaveBeenCalledWith('name', user.name);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
    expect(service.getUser).toHaveBeenCalledWith(user.id);
    expect(localStorage.setItem).toHaveBeenCalledWith('beneficiary_details', JSON.stringify({id: 'someId'}));
  }));

  it('should fetch the providers', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of('someProviders'));
    spyOn(service, 'getCurrentUser').and.returnValue({id: 'someId'});
    service.fetchProviders();
    tick();

    expect(httpService.get).toHaveBeenCalledWith( `${config.providerUrl}/providers?employee=someId`);
  }));

  describe('getCurrentUser', () => {
    it('should get the current user', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({name: 'someName'}));

      expect(service.getCurrentUser()).toEqual({name: 'someName'});
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });

    it('should handle empty results when getting the current user', () => {
      spyOn(localStorage, 'getItem').and.returnValue(undefined);

      expect(service.getCurrentUser()).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });
  });

  describe('getLoggedInBeneficiaryDetails', () => {
    it('should get the beneficiary details', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({name: 'someName'}));

      expect(service.getLoggedInBeneficiaryDetails()).toEqual({name: 'someName'});
      expect(localStorage.getItem).toHaveBeenCalledWith('beneficiary_details');
    });

    it('should handle empty results when getting the beneficiary details', () => {
      spyOn(localStorage, 'getItem').and.returnValue(undefined);

      expect(service.getLoggedInBeneficiaryDetails()).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('beneficiary_details');
    });
  });

  it('should get the agent programs', fakeAsync(() => {
    spyOn(httpService, 'get').and.returnValue(of('someValue'));

    service.getAgentPrograms(1);
    tick();

    expect(httpService.get).toHaveBeenCalledWith(`${config.programUrl}/agents/user/1/programs?type=ENROLLMENT&permissions=agent`);
  }));

  it('should check if a user is logged in', () => {
    const storageSpy = spyOn(localStorage, 'getItem');
    expect(service.loggedIn()).toBeFalsy();

    storageSpy.and.returnValue('someVal');
    expect(service.loggedIn()).toBeTruthy();
    expect(storageSpy).toHaveBeenCalledWith('auth_token');
  });

  it('should check if patients are allowed', () => {
    const userSpy = spyOn(service, 'getCurrentUser').and.returnValue({agentId: 'someId'});

    expect(service.allowedToRegisterPatients()).toBe('someId');
    expect(userSpy).toHaveBeenCalled();
    expect(service.allowedToRegisterPatients()).toBe('someId');

    userSpy.and.returnValue(undefined);

    expect(service.allowedToRegisterPatients()).toBeUndefined();
  });

  it('should logout', () => {
    spyOn(localStorage, 'clear');
    service.logOut();
    expect(localStorage.clear).toHaveBeenCalled();
  });

});
