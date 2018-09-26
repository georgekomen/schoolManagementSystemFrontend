import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {SchoolService} from '../../../shared/services/SchoolService';
import {School} from '../../../shared/Models/school';

@Component({
  selector: 'app-school-controller',
  templateUrl: './school-controller.component.html',
  styleUrls: ['./school-controller.component.css']
})
export class SchoolControllerComponent implements OnInit {

  public school: School = new School();

  constructor(private dialogRef: MatDialogRef<SchoolControllerComponent>,
              private schoolService: SchoolService) { }

  ngOnInit() {

  }

  postSchool() {
    this.schoolService.postSchool(this.school).subscribe(res => {
      console.log(res);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
