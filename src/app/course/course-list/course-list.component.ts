import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { CourseListDataSource } from './course-list-datasource';
import {SchoolDataSource} from '../../school/school-list/school-list-datasource';
import {SchoolService} from '../../shared/services/SchoolService';
import {Course} from '../../shared/Models/course';
import {AddSchoolComponent} from '../../school/school-list/add-school/add-school-.component';
import {AddCourseComponent} from './add-course/add-course.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CourseListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'icons'];

  courseList: Course[] = [];

  constructor(private schoolService: SchoolService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getCourseList();
  }

  addCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      // width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourseList();
    });
  }

  getCourseList() {
    this.schoolService.getCourses().subscribe(res => {
      this.courseList = res;
      this.dataSource = new CourseListDataSource(this.paginator, this.sort, this.courseList);
    });
  }

}
