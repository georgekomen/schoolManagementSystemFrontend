import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ConfigService} from '../config/ConfigService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    ConfigService.load();
  }
}
// todo - add country, filter counties by country(side filter using menu,
