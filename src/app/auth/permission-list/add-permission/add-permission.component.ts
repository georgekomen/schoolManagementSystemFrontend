import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {Permission} from '../../../shared/Models/permission';
import {AddSchoolComponent} from '../../../school/school-list/add-school/add-school-.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {

  public permission: Permission = new Permission();

  constructor(private authService: AuthenticationService,
              public dialogRef: MatDialogRef<AddPermissionComponent>) { }

  ngOnInit() {
  }

  addPermission() {
    this.authService.postPermission(this.permission).subscribe(res => {
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
