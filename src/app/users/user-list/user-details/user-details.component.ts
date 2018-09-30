import {Component, Inject, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/Models/user';
import {AddSchoolComponent} from '../../../school/school-list/add-school/add-school-.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Identification} from '../../../shared/Models/Identification';
import {SchoolDataSource} from '../../../school/school-list/school-list-datasource';
import {School} from '../../../shared/Models/school';
import {NotificationService} from '../../../../shared/notification.service';
import {UserSchool} from '../../../shared/Models/UserSchool';
import {Class1} from '../../../shared/Models/Class1';
import {StudentClass} from '../../../shared/Models/StudentClass';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = new User();
  schoolList: School[] = [];
  roles: string[] = [
    'PRINCIPAL',
    'DEPUTY_PRINCIPAL',
    'FINANCE_MANAGER',
    'HEAD_OF_DEPARTMENT',
    'DEPUTY_HEAD_OF_DEPARTMENT',
    'TEACHER',
    'CLASS_TEACHER',
    'STUDENT'
  ];
  classList: Class1[] = [];

  constructor(private schoolService: SchoolService,
              private userService: UserService,
              private dialogRef: MatDialogRef<AddSchoolComponent>,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  init() {
    this.user = new User();
    this.user.identifications[0].type = 'NATIONAL_ID';
  }

  ngOnInit() {
    this.init();
    if (this.data !== null) {
      this.user = this.data['user'];
    }
    this.getSchoolList();
    this.getClassList();
  }

  getSchoolList() {
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
    });
  }

  getClassList() {
    this.schoolService.getClasses().subscribe(res => {
      this.classList = res;
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
