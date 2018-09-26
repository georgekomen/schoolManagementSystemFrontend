import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/Models/user';
import {SchoolControllerComponent} from '../../../school/school-list/school-controller/school-controller.component';
import {MatDialogRef} from '@angular/material';
import {Identification} from '../../../shared/Models/Identification';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public user: User = new User();

  constructor(private schoolService: SchoolService,
              private userService: UserService,
              private dialogRef: MatDialogRef<SchoolControllerComponent>) {
    this.user.identifications = [];
    this.user.identifications[0] = new Identification();
    this.user.identifications[0].type = 'NATIONAL_ID';
  }

  ngOnInit() {
  }

  postSchool() {
    this.userService.postUser(this.user).subscribe(res => {
      console.log(res);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
