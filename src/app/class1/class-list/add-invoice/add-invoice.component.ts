import {Component, Input, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MatDialogRef} from '@angular/material';
import {Class1} from '../../../shared/Models/Class1';
import {ClassInvoice} from '../../../shared/Models/ClassInvoice';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  classList: Class1[] = [];

  classInvoice: ClassInvoice = new ClassInvoice();

  @Input() set _classList(_classList: Class1[]) {
    if (!isNullOrUndefined(_classList)) {
      this.classList = _classList;
      this.classInvoice.class1 = new Class1();
    }
  }

  @Input() set _class(_class: Class1) {
    if (!isNullOrUndefined(_class)) {
      this.classInvoice.class1.id = _class.id;
    }
  }

  @Input() set _classInvoice(_classInvoice: ClassInvoice) {
    if (!isNullOrUndefined(_classInvoice)) {
      this.classInvoice = _classInvoice;
    }
  }

  constructor(private schoolService: SchoolService,
              private dialogRef: MatDialogRef<AddInvoiceComponent>) {

  }

  ngOnInit() {
    if (isNullOrUndefined(this.classList)) {
      this.getClassList();
    }
  }

  getClassList() {
    this.schoolService.getClasses().subscribe(res => {
      this.classList = res;
    });
  }

  postClassInvoice() {
    this.schoolService.postClassInvoice(this.classInvoice).subscribe(res => {
      console.log(res);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
