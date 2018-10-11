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
import {Country} from '../Models/Country';
import {County} from '../Models/County';
import {Subcounty} from '../Models/Subcounty';
import {Subject1} from '../Models/Subject1';
import {ClassSubject} from '../Models/ClassSubject';
import {ClassExam} from '../Models/ClassExam';
import {StudentExam} from '../Models/studentExam';

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

  getCourse(courseId: number): Observable<Course> {
    const url = `${ConfigService.baseUrl}/school/get_course/${courseId}`;
    return this.http.get(url);
  }

  postClass(class1: Class1): Observable<Class1> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_class`, class1);
  }

  postSubject(subject: Subject1): Observable<Subject1> {
    return this.http.post(`${ConfigService.baseUrl}/exam/new_subject`, subject);
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

  getSubjects(courseId: number): Observable<Subject1[]> {
    return this.http.get(`${ConfigService.baseUrl}/exam/get_subjects?course=${courseId}`);
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

  postClassSubject(classSubject: ClassSubject): Observable<ClassSubject> {
    return this.http.post(`${ConfigService.baseUrl}/exam/new_class_subject`, classSubject);
  }

  postStream(stream: Stream): Observable<Stream> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_stream`, stream);
  }

  postClassExam(classExam: ClassExam): Observable<ClassExam> {
    return this.http.post(`${ConfigService.baseUrl}/exam/new_class_exam`, classExam);
  }

  postUserInvoice(userInvoice: UserInvoice): Observable<UserInvoice> {
    return this.http.post(`${ConfigService.baseUrl}/invoice/new_user_invoice`, userInvoice);
  }

  getSchools(subCountyId: number): Observable<School[]> {
    let url = `${ConfigService.baseUrl}/school/get_schools`;
    if (subCountyId !== null) {
      url += `?subCounty=${subCountyId}`;
    }
    return this.http.get(url);
  }

  getStreams(classid: number): Observable<Stream[]> {
    return this.http.get(`${ConfigService.baseUrl}/school/get_streams?classId=${classid}`);
  }

  postCounty(county: County): Observable<County> {
    return this.http.post(`${ConfigService.baseUrl}/region/new_county`, county);
  }

  postSchoolLogo(schoolId: number, file: FormData): Observable<School> {
    return this.http.upload(`${ConfigService.baseUrl}/school/upload_school_logo/${schoolId}`, file);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get(`${ConfigService.baseUrl}/region/get_countries`);
  }

  getSchool(schoolId: number): Observable<School> {
    return this.http.get(`${ConfigService.baseUrl}/school/get_school/${schoolId}`);
  }

  getCounties(countryId: number): Observable<County[]> {
    return this.http.get(`${ConfigService.baseUrl}/region/get_counties/${countryId}`);
  }

  getSubCounties(countyId: number): Observable<County[]> {
    return this.http.get(`${ConfigService.baseUrl}/region/get_subCounties/${countyId}`);
  }

  getSubCounty(countyId: number): Observable<Subcounty[]> {
    return this.http.get(`${ConfigService.baseUrl}/region/get_subCounties/${countyId}`);
  }

  postSchool(school: School): Observable<School> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_school`, school);
  }

  postCourse(course: Course): Observable<Course> {
    return this.http.post(`${ConfigService.baseUrl}/school/new_course`, course);
  }

  postStudentExam(studentExam: StudentExam): Observable<StudentExam> {
    return this.http.post(`${ConfigService.baseUrl}/exam/new_student_exam`, studentExam);
  }

  postSubCounty(subCounty: Subcounty): Observable<Subcounty> {
    return this.http.post(`${ConfigService.baseUrl}/region/new_subCounty`, subCounty);
  }

}
