import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MatDialogRef} from '@angular/material';
import {Course} from '../../../shared/Models/course';
import {School} from '../../../shared/Models/school';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  schoolList: School[] = [];
  course: Course = new Course();

  constructor(private dialogRef: MatDialogRef<AddCourseComponent>,
              private schoolService: SchoolService) { }

  ngOnInit() {
    this.getSchoolList();
  }


  getSchoolList() {
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
    });
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
