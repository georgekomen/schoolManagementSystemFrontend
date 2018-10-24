import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolService} from '../../shared/services/SchoolService';
import {EventsService} from '../../shared/services/events.service';
import {StudentExam} from '../../shared/Models/studentExam';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  defaultDisplayedColumns: string[] = ['filter', 'name'];

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<StudentExam>();

  studentExam: StudentExam[] = [];

  classExamId: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private schoolService: SchoolService,
              private dialog: MatDialog,
              private event: EventsService) { }

  ngOnInit() {
    this.init();
    this.dataSource.sort = this.sort;
    this.event.subscribe('classExamId', data => {
      this.classExamId = data;
      this.getStudentExams();
    });
  }

  init() {
    this.displayedColumns.splice(0 , this.displayedColumns.length);
    this.defaultDisplayedColumns.forEach(rr => {
      this.displayedColumns.push(rr);
    });
  }

  getStudentExams() {
    this.init();
    this.schoolService.getStudentExam(this.classExamId).subscribe(res => {
      this.studentExam = res;
      // loop through and add subject as headers
      this.studentExam[0].studentExamResults.forEach(r => {
        this.displayedColumns.push(r.subject.name);
      });
      this.displayedColumns.push('icons');

      this.studentExam.forEach(rr => {
        rr.studentExamResults.forEach(gg => {
          gg.disabled = 'disabled';
        });
      });

      this.dataSource =  new MatTableDataSource<StudentExam>(this.studentExam);
    });
  }

  getPassMark(subject: string): number {
    return this.studentExam[0].studentExamResults.find(rr => rr.subject.name === subject).subject.pass_mark;
  }

  isDisabled(subject: string, studentExam: StudentExam): string {
    return  this.studentExam.find(g => g.id === studentExam.id).studentExamResults.find(ff => ff.subject.name === subject).disabled;
  }

  enable(subject: string, studentExam: StudentExam) {
    this.studentExam.find(g => g.id === studentExam.id).studentExamResults.find(ff => ff.subject.name === subject).disabled = '';
    this.dataSource = null;
    this.dataSource =  new MatTableDataSource<StudentExam>(this.studentExam);
  }

  update(event, studentExam: StudentExam) {
    console.log(event.target.value);
  }

  getSubjectResult(subject: string, studentExam: StudentExam): number {
    const pass = studentExam.studentExamResults.find(rr => rr.subject.name === subject).subject.pass_mark;
    let result = studentExam.studentExamResults.find(rr => rr.subject.name === subject).result_mark;
    if (result === null) {
      result = 0;
    }

    // return `${result} / ${pass}`;
    return result;
  }

}
