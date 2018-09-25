import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ConfigService} from '../config/ConfigService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(translate: TranslateService, private configService: ConfigService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.configService.load();
  }
}
