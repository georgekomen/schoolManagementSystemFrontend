import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';
import {School} from '../Models/school';
import {Course} from '../Models/course';
import {Class1} from '../Models/Class1';
import {ClassInvoice} from '../Models/ClassInvoice';
import {StudentClass} from '../Models/StudentClass';

@Injectable()
export class SchoolService {
  constructor(
    private http: BaseHttpService<any>,
    private configService: ConfigService,
  ) {
  }

  getCourses(): Observable<Course[]> {
    return this.http.get(`${this.configService.baseUrl}/school/get_courses`);
  }

  postClass(class1: Class1): Observable<Class1> {
    return this.http.post(`${this.configService.baseUrl}/school/new_class`, class1);
  }

  getClasses(): Observable<Class1[]> {
    return this.http.get(`${this.configService.baseUrl}/school/get_classes`);
  }

  postClassInvoice(classInvoice: ClassInvoice): Observable<ClassInvoice> {
    return this.http.post(`${this.configService.baseUrl}/invoice/new_class_invoice`, classInvoice);
  }

  postNewStudentClass(studentClass: StudentClass): Observable<StudentClass> {
    return this.http.post(`${this.configService.baseUrl}/school/new_student_class`, studentClass);
  }

  getSchools(): Observable<School[]> {
    return this.http.get(`${this.configService.baseUrl}/school/get_schools`);
  }

  postSchool(school: School): Observable<School> {
    return this.http.post(`${this.configService.baseUrl}/school/new_school`, school);
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post(`${this.configService.baseUrl}/school/new_course`, course);
  }

}
