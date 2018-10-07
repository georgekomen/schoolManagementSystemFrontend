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
import {NotificationService} from '../../shared/notification.service';

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
              private events: EventsService,
              private notificationService: NotificationService) {}

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
    ConfigService.selectedSchool = event.value;
    this.getCourseList(ConfigService.selectedSchool.id);
  }

  getCourseList(schoolId: number) {
    this.schoolService.getCourses(schoolId).subscribe(res => {
      this.courseList = res;
      ConfigService.courseList = this.courseList;
      this.events.publish('courseList', ConfigService.courseList);
    });
  }

  getSchoolList() {
    // TODO - get user schools
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
      if (this.schoolList.length > 0) {
        ConfigService.schoolList = this.schoolList;
        ConfigService.selectedSchool = ConfigService.schoolList[0];
        this.selectedSchool = ConfigService.selectedSchool;
        this.getCourseList(ConfigService.selectedSchool.id);
      } else {
        this.notificationService.warning('Warning', 'No schools found');
      }
    });
  }
}
