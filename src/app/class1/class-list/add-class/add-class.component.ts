import {Component, Inject, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Course} from '../../../shared/Models/course';
import {School} from '../../../shared/Models/school';
import {AddCourseComponent} from '../../../course/course-list/add-course/add-course.component';
import {Class1} from '../../../shared/Models/Class1';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  courseList: Course[] = [];

  schoolList: School[] = [];

  class1: Class1 = new Class1();

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  constructor(private schoolService: SchoolService,
              private dialogRef: MatDialogRef<AddClassComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.getSchoolList();
    this.getCourseList();
    if (this.data !== null) {
      this.class1 = this.data['class1'];
    }
  }

  getSchoolList() {
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
    });
  }

  getCourseList() {
    this.schoolService.getCourses().subscribe(res => {
      this.courseList = res;
    });
  }

  postClass() {
    this.schoolService.postClass(this.class1).subscribe(res => {
      this.class1 = res;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
