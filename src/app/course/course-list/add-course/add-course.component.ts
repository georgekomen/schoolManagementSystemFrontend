import {Component, Inject, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Course} from '../../../shared/Models/course';
import {School} from '../../../shared/Models/school';
import {ConfigService} from '../../../../config/ConfigService';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course: Course = new Course();

  isLinear = false;

  constructor(private dialogRef: MatDialogRef<AddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private schoolService: SchoolService) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      // edit existing course
      this.schoolService.getCourse(this.data['course'].id).subscribe(res => {
        this.course = res;
      });
    }
    this.course.school = ConfigService.selectedSchool;
  }

  postCourse() {
    this.schoolService.postCourse(this.course).subscribe(res => {
      console.log(res);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
