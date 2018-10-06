import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {SchoolService} from '../shared/services/SchoolService';
import {School} from '../shared/Models/school';
import {isNullOrUndefined} from 'util';
import {CourseListDataSource} from '../course/course-list/course-list-datasource';
import {Course} from '../shared/Models/course';
import {ClassListDataSource} from '../class1/class-list/class-list-datasource';
import {Class1} from '../shared/Models/Class1';
import {EventsService} from '../shared/services/events.service';
import {ConfigService} from '../../config/ConfigService';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  courseList: Course[] = [];

  schoolList: School[] = [];

  selectedSchool: School;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
              private schoolService: SchoolService,
              private events: EventsService) {}

   public page(): string {
    if (this.router.url === '/login') {
      return 'hidden';
    } else {
      return 'visible';
    }
  }

  ngOnInit(): void {
    this.getSchoolList();
  }

  schoolChange(event) {
    this.schoolService.getCourses(event.value.id).subscribe(res => {
      this.courseList = res;
      this.events.publish('courseList', this.courseList);
    });
  }

  getSchoolList() {
      this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
      this.events.publish('schoolList', this.schoolList);
    });
  }
}
