import {Component, Inject, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Course} from '../../../shared/Models/course';
import {School} from '../../../shared/Models/school';
import {AddCourseComponent} from '../../../course/course-list/add-course/add-course.component';
import {Class1} from '../../../shared/Models/Class1';
import {ClassInvoice} from '../../../shared/Models/ClassInvoice';
import {Stream} from '../../../shared/Models/Steam';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  isLinear = false;

  course: Course;

  schoolList: School[] = [];

  class1: Class1 = new Class1();

  minDate = new Date(2000, 0, 1);

  maxDate = new Date(2020, 0, 1);

  constructor(private schoolService: SchoolService,
              private dialogRef: MatDialogRef<AddClassComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    if (this.data !== null) {
      if (this.data['class1']) {
        this.schoolService.getClass(this.data['class1'].id).subscribe(res => {
          this.class1 = res;
        });
      }
      if (this.data['course']) {
        this.course = this.data['course'];
      }
    }
  }

  postClass() {
    this.schoolService.postClass(this.class1).subscribe(res => {
      this.class1 = res;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  postClassInvoice(classInvoice: ClassInvoice) {
    this.schoolService.postClassInvoice(classInvoice).subscribe(res => {
      console.log(res);
    });
  }

  // TODO - do remove invoice both locally and backend
  removeInvoice(classInvoice: ClassInvoice) {

  }

  addInvoice() {
    const newClassInvoice: ClassInvoice = new ClassInvoice();
    newClassInvoice.class1 = new Class1();
    newClassInvoice.class1.id = this.class1.id;
    newClassInvoice.name = `${this.class1.name} Invoice`;
    newClassInvoice.invoice_date = new Date().toJSON().toString();
    if (this.class1.classInvoices === undefined) {
      this.class1.classInvoices = [];
    }
    this.class1.classInvoices.push(newClassInvoice);
  }

  startDateChange(event) {
    const stDate = event.value;
    const ed = new Date(stDate.getFullYear() + 1, stDate.getMonth(), stDate.getDate());
    this.class1.end_date = ed.toJSON().toString();
    this.class1.name = `${stDate.getFullYear().toString()}/${(stDate.getFullYear() + 1).toString()} ${this.course.name}`;
    this.class1.course = this.course;
  }

  postStreamm(stream: Stream) {
    this.schoolService.postStream(stream).subscribe(res => {
      console.log(res);
    });
  }

  addStreamm() {
    if (this.class1.streams === undefined) {
      this.class1.streams = [];
    }
    const stream: Stream = new Stream();
    stream.class1 = new Class1();
    stream.class1.id = this.class1.id;
    this.class1.streams.push(stream);
  }

}
