import {Component, Inject, Input, OnInit} from '@angular/core';
import {StudentClass} from '../../../shared/Models/StudentClass';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../shared/Models/user';
import {Class1} from '../../../shared/Models/Class1';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-user-class',
  templateUrl: './add-user-class.component.html',
  styleUrls: ['./add-user-class.component.css']
})
export class AddUserClassComponent implements OnInit {

  minDate = new Date(2000, 0, 1);

  maxDate = new Date(2020, 0, 1);

  studentClasses: StudentClass = new StudentClass();

  user: User = new User();

  classList: Class1[] = [new Class1()];

  @Input() set _classList(_classList: Class1[]) {
    if (!isNullOrUndefined(_classList)) {
      this.classList = _classList;
    }
  }

  @Input() set _user(_user: User) {
    if (!isNullOrUndefined(_user)) {
      this.user = _user;
    }
  }

  @Input() set _studentClasses(_studentClasses: StudentClass) {
    if (!isNullOrUndefined(_studentClasses)) {
      this.studentClasses = _studentClasses;
    }
  }

  constructor(private schoolService: SchoolService,
              private dialogRef: MatDialogRef<AddUserClassComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {

  }

  postUserClass() {
    this.studentClasses.user = new User();
    this.studentClasses.user.id = this.user.id;
    this.schoolService.postNewStudentClass(this.studentClasses[0]).subscribe(res => {
      console.log(res);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
