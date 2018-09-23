import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class NotificationService {


  constructor(private toast: ToastrService, private trans: TranslateService) {
  }

  error(title, msg, params = null) {
    this.msg(title, msg, params, 'error');
  }

  warning(title, msg, params: Object = null) {
    this.msg(title, msg, params, 'warning');
  }

  success(title, msg, params: Object = null) {
    this.msg(title, msg, params, 'success');
  }


  private msg(title, msg, params: Object, type = 'error') {
    title = this.trans.instant(title, params);
    msg = this.trans.instant(msg, params);

    switch (type) {
      case 'error':
        this.toast.error(msg, title);
        break;
      case 'warning':
        this.toast.warning(msg, title);
        break;
      case 'success':
        this.toast.success(msg, title);
        break;
    }
  }


}
