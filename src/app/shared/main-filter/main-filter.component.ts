import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/SchoolService';
import {EventsService} from '../services/events.service';
import {Class1} from '../Models/Class1';
import {Course} from '../Models/course';
import {ConfigService} from '../../../config/ConfigService';
import {ClassExam} from '../Models/ClassExam';

@Component({
  selector: 'app-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.css']
})
export class MainFilterComponent implements OnInit {
  courseList: Course[] = [];

  selectedExam: ClassExam;

  year: string;

  classList: Class1[] = [];

  selectedClass: Class1 = new Class1();

  selectedCourse: Course;

  constructor(private schoolService: SchoolService,
              private events: EventsService) { }

  ngOnInit() {
    this.year = new Date().getFullYear().toString();
    this.courseList = ConfigService.courseList;
    this.events.subscribe('courseList', (data) => {
      this.courseList = data;
    });
  }


  courseChange(event) {
    this.selectedCourse = event.value;
    this.schoolService.getClasses(event.value.id, this.year + '-01-01T00:00:00').subscribe(res => {
      this.classList = res;

    });
  }

  classChange(event) {
    // emit year, course, class, stream for filtering
    this.schoolService.getClass(event.value).subscribe(res => {
      this.selectedClass = res;
    });
  }

  examChange(classExam: ClassExam) {

  }
}
