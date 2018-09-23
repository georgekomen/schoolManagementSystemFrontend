import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ConfigService {
  public userUrl = '';
  public providerUrl = '';
  public financeUrl = '';
  public pricelistUrl = '';
  public programUrl = '';
  public productUrl = '';
  public claimUrl = '';
  public futabillUrl = '';
  public messagingServiceUrl = '';

  public permission = {
    SUPERVISOR_PROVIDER: 32,
    PROVIDER_FINANCE_MANAGER: 23,
    MANAGE_PROVIDER: 4,
    MANAGE_PATIENT: 35,
  };

  constructor(private http: HttpClient) {
  }

  load() {
    localStorage.setItem('register_member_above_years', '18');
    localStorage.setItem('register_dependant_above_years', '0');
    localStorage.setItem('register_member_below_years', '150');
    localStorage.setItem('register_dependant_below_years', '50');

    this.http.get<any>('/assets/config.json')
      .subscribe( data => {
        switch (location.hostname) {
          case 'localhost':
            this.setAccUrlEndpoints();
            break;

          case 'provider-20-site.s3-website-ap-southeast-1.amazonaws.com':
          case 'provider-test.carepool.co.ke':
            this.setAccUrlEndpoints();
            break;

          case 'provider20-acc-site.s3-website-ap-southeast-1.amazonaws.com':
          case 'provider20-acc.carepool.co.ke':
            this.setAccUrlEndpoints();
            break;

          case 'provider2-prod.carepool.co.ke':
          case 'provider-20-prod.s3-website-ap-southeast-1.amazonaws.com':
          case 'provider-20-prod.s3.amazonaws.com':
          case 'provider.carepool.co.ke':
          case 'mtiba.carepool.co.ke':
            this.setProdUrlEndpoints();
            break;

          case 'provider.carepool.co.tz':
            this.setProdUrlEndpoints();
            break;

          case 'provider-prov.carepool.co.ke':
          case 'provider-rtl.carepool.co.ke':
          case 'provider-corp.carepool.co.ke':
          case 'provider-core.carepool.co.ke':
          case 'provider-pi.carepool.co.ke':
            this.userUrl = data['userUrl'];
            this.providerUrl = data['providerUrl'];
            this.financeUrl = data['financeUrl'];
            this.pricelistUrl = data['pricelistUrl'];
            this.programUrl = data['programUrl'];
            this.productUrl = data['productUrl'];
            this.claimUrl = data['claimUrl'];
            this.futabillUrl = 'http://portal-acc.futabill.co.ke';
            this.messagingServiceUrl = 'http://cpsfc.carepool.co.ke:9014';

            break;
        }
      });
  }

  setProdUrlEndpoints() {
    this.userUrl = 'https://security-prod.carepool.co.ke';
    this.providerUrl = 'https://provider-prod.carepool.co.ke';
    this.financeUrl = 'https://finance-prod.carepool.co.ke';
    this.pricelistUrl = 'https://pricelist-prod.carepool.co.ke';
    this.programUrl = 'https://program-prod.carepool.co.ke';
    this.productUrl = 'https://product-prod.carepool.co.ke';
    this.claimUrl = 'https://claims-prod.carepool.co.ke';
    this.futabillUrl = 'http://my.futabill.co.ke';
    this.messagingServiceUrl = 'http://messaging-service-prod.ap-southeast-1.elasticbeanstalk.com';
  }

  setAccUrlEndpoints() {
    this.userUrl =
      'http://usermanagement-acc.ap-southeast-1.elasticbeanstalk.com';
    this.providerUrl =
      'http://provider-service-acc.ap-southeast-1.elasticbeanstalk.com';
    this.financeUrl = 'http://finance-acc.ap-southeast-1.elasticbeanstalk.com';
    this.pricelistUrl = 'http://pricelist-acc.ap-southeast-1.elasticbeanstalk.com';
    this.programUrl = 'http://program-service-acc.ap-southeast-1.elasticbeanstalk.com';
    this.productUrl = 'http://product-service-acc.ap-southeast-1.elasticbeanstalk.com';
    this.claimUrl = 'http://claims-service-acc.ap-southeast-1.elasticbeanstalk.com';
    this.futabillUrl = 'https://portal-acc.futabill.co.ke';
    //this.messagingServiceUrl = 'http://cpsfc.carepool.co.ke:9014';
    this.messagingServiceUrl = 'http://cpsfc.carepool.co.ke:9014';
  }

  setLocalClusterUrlEndpoints() {
    // set your cluster name
    const clusterName = 'corp';
    this.userUrl = `http://${clusterName}.carepool.co.ke/usermanagement`;
    this.providerUrl = `http://${clusterName}.carepool.co.ke/provider`;
    this.financeUrl = `http://${clusterName}.carepool.co.ke/finance`;
    this.pricelistUrl = `http://${clusterName}.carepool.co.ke/pricelist`;
    this.programUrl = `http://${clusterName}.carepool.co.ke/program`;
    this.productUrl = `http://${clusterName}.carepool.co.ke/product`;
    this.claimUrl = `http://${clusterName}.carepool.co.ke/claim`;
    this.messagingServiceUrl = 'http://cpsfc.carepool.co.ke:9014';
  }

}
