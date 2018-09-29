import {Component, Input, OnInit} from '@angular/core';
import {SchoolService} from '../../../shared/services/SchoolService';
import {MatDialogRef} from '@angular/material';
import {Class1} from '../../../shared/Models/Class1';
import {ClassInvoice} from '../../../shared/Models/ClassInvoice';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  @Input()
  classList: Class1[] = [];

  classInvoice: ClassInvoice = new ClassInvoice();

  constructor(private schoolService: SchoolService,
              private dialogRef: MatDialogRef<AddInvoiceComponent>) { }

  ngOnInit() {
    if (this.classList == null || this.classList === []) {
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
