import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/SchoolService';
import {EventsService} from '../services/events.service';
import {Class1} from '../Models/Class1';
import {Course} from '../Models/course';

@Component({
  selector: 'app-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.css']
})
export class MainFilterComponent implements OnInit {
  courseList: Course[] = [];

  year: string;

  classList: Class1[] = [];

  selectedClass: Class1;

  selectedCourse: Course;
  constructor(private schoolService: SchoolService,
              private events: EventsService) { }

  ngOnInit() {
    const d = new Date();
    this.year = d.getFullYear().toString();
    this.events.subscribe('courseList', (data) => {
      this.courseList = data;
    });
  }


  courseChange(event) {
    this.schoolService.getClasses(event.value.id, this.year + '-01-01T00:00:00').subscribe(res => {
      this.classList = res;
      this.events.publish('classList', this.classList);
    });
  }

  classChange(event) {

  }
}
