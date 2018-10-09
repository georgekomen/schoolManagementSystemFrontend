import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SchoolService} from '../../../shared/services/SchoolService';
import {School} from '../../../shared/Models/school';
import {Subcounty} from '../../../shared/Models/Subcounty';

@Component({
  selector: 'app-school-controller',
  templateUrl: './add-school-.component.html',
  styleUrls: ['./add-school-.component.css']
})
export class AddSchoolComponent implements OnInit {

  public school: School = new School();

  subCounty: Subcounty;

  constructor(private dialogRef: MatDialogRef<AddSchoolComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private schoolService: SchoolService) { }

  ngOnInit() {
    if (this.data !== null) {
      this.subCounty = this.data['subCounty'];
      this.school.subCounty = new Subcounty();
      this.school.subCounty.id = this.subCounty.id;
    }
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
