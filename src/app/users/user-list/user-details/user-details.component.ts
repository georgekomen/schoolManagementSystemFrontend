import {Component, Inject, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/Models/user';
import {SchoolControllerComponent} from '../../../school/school-list/school-controller/school-controller.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Identification} from '../../../shared/Models/Identification';
import {SchoolDataSource} from '../../../school/school-list/school-list-datasource';
import {School} from '../../../shared/Models/school';
import {NotificationService} from '../../../../shared/notification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = new User();
  schoolList: School[] = [];

  constructor(private schoolService: SchoolService,
              private userService: UserService,
              private dialogRef: MatDialogRef<SchoolControllerComponent>,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user.identifications = [];
    this.user.identifications[0] = new Identification();
    this.user.identifications[0].type = 'NATIONAL_ID';
  }

  ngOnInit() {
    this.user = this.data['user'];
    this.getSchoolList();
  }

  getSchoolList() {
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
    });
  }

  postUser() {
    this.userService.postUser(this.user).subscribe(res => {
      console.log(res);
      this.user = res;
      this.notificationService.success('Success', 'successfully registered user');
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
