import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { CourseListDataSource } from './course-list-datasource';
import {SchoolService} from '../../shared/services/SchoolService';
import {Course} from '../../shared/Models/course';
import {AddCourseComponent} from './add-course/add-course.component';
import {ClassListComponent} from '../../class1/class-list/class-list.component';
import {NotificationService} from '../../../shared/notification.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CourseListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'icons'];

  courseList: Course[] = [];

  constructor(private schoolService: SchoolService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getCourseList();
  }

  addCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourseList();
    });
  }

  getClasses(course: Course) {
    const dialogRef = this.dialog.open(ClassListComponent, {
        data: { course: course },
        height: '100%',
        width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openCourse(course: Course) {
    const dialogRef = this.dialog.open(AddCourseComponent, {
        data: { course: course },
        height: '100%',
        width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getCourseList() {
    this.schoolService.getCourses(null).subscribe(res => {
      this.courseList = res;
      this.dataSource = new CourseListDataSource(this.sort, this.courseList);

      if (this.courseList.length < 1) {
        this.notificationService.warning('Warning', 'No courses found');
      }
    });
  }

}
