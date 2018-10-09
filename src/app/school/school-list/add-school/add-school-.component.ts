import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SchoolService} from '../../../shared/services/SchoolService';
import {School} from '../../../shared/Models/school';
import {Subcounty} from '../../../shared/Models/Subcounty';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-school-controller',
  templateUrl: './add-school-.component.html',
  styleUrls: ['./add-school-.component.css']
})
export class AddSchoolComponent implements OnInit {

  isLinear = false;

  school: School = new School();

  subCounty: Subcounty;

  formData: FormData = new FormData();

  selectedFile: File;

  constructor(private dialogRef: MatDialogRef<AddSchoolComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private schoolService: SchoolService) { }

  ngOnInit() {
    if (this.data !== null) {
      console.log(this.data);
      if (!isNullOrUndefined(this.data['subCounty'])) {
        // add school
        this.subCounty = this.data['subCounty'];
        console.log(this.subCounty);
        this.school.subCounty = new Subcounty();
        this.school.subCounty.id = this.subCounty.id;
      }

      if (!isNullOrUndefined(this.data['school'])) {
        // modify school
        this.schoolService.getSchool(this.data['school'].id).subscribe(res => {
          this.school = res;
        });
      }
    }
  }

  setLogo(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.formData.append('file', this.selectedFile, this.selectedFile.name);
    // this.formData.append('file', filess, filess.name);
  }

  postSchoolLogo() {
    this.schoolService.postSchoolLogo(this.school.id, this.formData).subscribe(res => {

    });
  }

  postSchool() {
    this.schoolService.postSchool(this.school).subscribe(res => {
      this.school = res;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
