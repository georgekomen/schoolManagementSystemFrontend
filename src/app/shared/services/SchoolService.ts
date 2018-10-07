import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../config/ConfigService';
import { BaseHttpService } from '../../../shared/base.http.service';
import {School} from '../Models/school';
import {Course} from '../Models/course';
import {Class1} from '../Models/Class1';
import {ClassInvoice} from '../Models/ClassInvoice';
import {StudentClass} from '../Models/StudentClass';
import {Identification} from '../Models/Identification';
import {UserSchool} from '../Models/UserSchool';
import {UserInvoice} from '../Models/UserInvoice';
import {Stream} from '../Models/Steam';

@Injectable()
export class SchoolService {
  constructor(
    private http: BaseHttpService<any>
  ) {
  }

  getCourses(schoolId: number): Observable<Course[]> {
    let url = `${ConfigService.baseUrl}/school/get_courses`;
    if (schoolId != null) {
      url += `?schoolId=${schoolId}`;
    }
    return this.http.get(url);
  }

  postClass(class1: Class1): Observable<Class1> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_class`, class1);
  }

  getClasses(courseId: number, startDate: string): Observable<Class1[]> {
    let url = `${ConfigService.baseUrl}/school/get_classes`;
    if (courseId !== null || startDate !== null) {
      url += '?';
    }
    if (courseId !== null) {
      url += `courseId=${courseId}&`;
    }
    if (startDate !== null) {
      url += `year=${startDate}`;
    }
    return this.http.get(url);
  }

  getClass(classId): Observable<Class1> {
    return this.http.get(`${ConfigService.baseUrl}/school/get_class/${classId}`);
  }

  postClassInvoice(classInvoice: ClassInvoice): Observable<ClassInvoice> {
    return this.http.post(`${ConfigService.baseUrl}/invoice/new_class_invoice`, classInvoice);
  }

  postNewStudentClass(studentClass: StudentClass): Observable<StudentClass> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_student_class`, studentClass);
  }

  postUserIdentification(identification: Identification): Observable<Identification> {
    return this.http.post(`${ConfigService.baseUrl}/user/new_user_identification`, identification);
  }

  postUserSchool(userSchool: UserSchool): Observable<UserSchool> {
    return this.http.post(`${ConfigService.baseUrl}/user/new_user_school`, userSchool);
  }

  postStream(stream: Stream): Observable<Stream> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_stream`, stream);
  }

  postUserInvoice(userInvoice: UserInvoice): Observable<UserInvoice> {
    return this.http.post(`${ConfigService.baseUrl}/invoice/new_user_invoice`, userInvoice);
  }

  getSchools(): Observable<School[]> {
    return this.http.get(`${ConfigService.baseUrl}/school/get_schools`);
  }

  getStreams(classid: number): Observable<Stream[]> {
    return this.http.get(`${ConfigService.baseUrl}/school/get_streams?classId=${classid}`);
  }

  postSchool(school: School): Observable<School> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_school`, school);
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_course`, course);
  }

}
