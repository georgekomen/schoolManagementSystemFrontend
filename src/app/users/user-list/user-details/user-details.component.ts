import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/Models/user';
import {AddSchoolComponent} from '../../../school/school-list/add-school/add-school-.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from '@angular/material';
import {Identification} from '../../../shared/Models/Identification';
import {SchoolDataSource} from '../../../school/school-list/school-list-datasource';
import {School} from '../../../shared/Models/school';
import {NotificationService} from '../../../../shared/notification.service';
import {UserSchool} from '../../../shared/Models/UserSchool';
import {Class1} from '../../../shared/Models/Class1';
import {StudentClass} from '../../../shared/Models/StudentClass';
import {ConfigService} from '../../../../config/ConfigService';
import {UserInvoice} from '../../../shared/Models/UserInvoice';
import {Stream} from '../../../shared/Models/Steam';
import {isNullOrUndefined} from 'util';
import {StudentExam} from '../../../shared/Models/studentExam';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;

  isLinear = false;

  user: User = new User();

  schoolList: School[] = [];

  streamList: Stream[] = [];

  roles: string[] = ['PRINCIPAL', 'DEPUTY_PRINCIPAL', 'FINANCE_MANAGER', 'HEAD_OF_DEPARTMENT',
    'DEPUTY_HEAD_OF_DEPARTMENT', 'TEACHER', 'CLASS_TEACHER', 'STUDENT'];

  classList: Class1[] = [];

  minDate = new Date(2000, 0, 1);

  maxDate = new Date(2020, 0, 1);

  steppeIndex = 0;

  identificationTypes: string[] = [
    'ADMISSION_NUMBER',
    'NATIONAL_ID',
    'PARENT_PHONE_NUMBER'
  ];

  invOptions = ['SCHOOL_TO_USER', 'USER_TO_SCHOOL'];

  constructor(private schoolService: SchoolService,
              private userService: UserService,
              private dialogRef: MatDialogRef<AddSchoolComponent>,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngAfterViewInit(): void {
    this.setStepperIndex(this.steppeIndex);
  }

  setStepperIndex(index1) {
    setTimeout(() => {
      this.stepper.reset();
      this.stepper.selectedIndex = index1;
    }, 500);
  }

  init() {
    this.user = new User();
  }

  ngOnInit() {
    this.init();
    if (this.data !== null) {
      this.userService.getUser(this.data['user'].id).subscribe(res => {
        this.user = res;
      });
    }
    this.schoolList = ConfigService.schoolList;
    this.getClassList();
  }

  streamListPerClass(classId: number): Stream[] {
    return this.streamList.filter(tt => tt.class1.id === classId);
  }

  getClassList() {
    this.schoolService.getClasses(null, null).subscribe(res => {
      this.classList = res;
      this.classList.forEach(res1 => {
        this.getStreams(res1.id);
      });
    });
  }

  postUser() {
    this.userService.postUser(this.user).subscribe(res => {
      this.user = res;
      this.notificationService.success('Success', 'successfully registered user');
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  postUserClass(studentClass: StudentClass) {
    this.schoolService.postNewStudentClass(studentClass).subscribe(res => {
      console.log(res);
    });
  }

  classSelected(studentClass: StudentClass, event) {
    this.user.studentClasses.find(gg => gg.id === studentClass.id).date_joined
      = this.classList.find(rr => rr.id === event.value).start_date;
    this.getStreams(studentClass.class1.id);
  }

  getStreams(classId: number) {
    this.schoolService.getStreams(classId).subscribe(res => {
      res.forEach(st => {
        if (this.streamList.findIndex(gg => gg.id === st.id) < 0) {
          this.streamList.push(st);
        }
      });
      console.log(this.streamList);
    });
  }

  postUserExam(studentExam: StudentExam) {
    this.schoolService.postStudentExam(studentExam).subscribe(res => {

    });
  }

  addUserExam() {
    // TODO - add class to an exam
    if (isNullOrUndefined(this.user.studentExams)) {
      this.user.studentExams = [];
    }
    const studentExam: StudentExam = new StudentExam();
    studentExam.sitting_date = new Date().toJSON().toString();
    studentExam.user = new User();
    studentExam.user.id = this.user.id;
    this.user.studentExams.push(studentExam);
  }

  addUserClass() {
    if (this.user.studentClasses === undefined) {
      this.user.studentClasses = [];
    }
    const studentClass: StudentClass = new StudentClass();
    studentClass.class1 = new Class1();
    studentClass.user = new User();
    studentClass.user.id = this.user.id;
    studentClass.stream = new Stream();
    this.user.studentClasses.push(studentClass);
  }

  postIdentification(ide: Identification) {
    this.schoolService.postUserIdentification(ide).subscribe(res => {
      console.log(res);
    });
  }

  addIdentification() {
    if (this.user.identifications === undefined) {
      this.user.identifications = [];
    }
    const identification: Identification = new Identification();
    identification.user = new User();
    identification.user.id = this.user.id;
    this.user.identifications.push(identification);
  }

  postUserSchool(userSchool: UserSchool) {
    this.schoolService.postUserSchool(userSchool).subscribe(res => {
      console.log(res);
    });
  }

  addUserSchool() {
    if (this.user.userSchools === undefined) {
      this.user.userSchools = [];
    }
    const userSchool: UserSchool = new UserSchool();
    userSchool.school = new School();
    userSchool.user = new User();
    userSchool.user.id = this.user.id;
    this.user.userSchools.push(userSchool);
  }

  postUserInvoice(userInvoice: UserInvoice) {
    this.schoolService.postUserInvoice(userInvoice).subscribe(res => {
      console.log(res);
    });
  }

  addUserInvoice() {
    if (this.user.userInvoices === undefined) {
      this.user.userInvoices = [];
    }
    const userInvoice: UserInvoice = new UserInvoice();
    userInvoice.user = new User();
    userInvoice.user.id = this.user.id;
    this.user.userInvoices.push(userInvoice);
  }

}
