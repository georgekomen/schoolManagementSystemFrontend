import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import { ClassListDataSource } from './class-list-datasource';
import {SchoolService} from '../../shared/services/SchoolService';
import {Course} from '../../shared/Models/course';
import {Class1} from '../../shared/Models/Class1';
import {AddClassComponent} from './add-class/add-class.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ClassListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'icons'];


  classList: Class1[] = [];

  course: Course;

  constructor(private schoolService: SchoolService, private dialog: MatDialog,
              private dialogRef: MatDialogRef<ClassListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    if (this.data !== null) {
      this.course = this.data['course'];
      this.getClassList(this.course.id);
    }
  }

  addClass1() {
    const dialogRef = this.dialog.open(AddClassComponent, {
      data: { course: this.course },
      height: '100%',
      width: '70%',
      scrollStrategy: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClassList(null);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  class1Details(class1: Class1) {
    const dialogRef = this.dialog.open(AddClassComponent, {
      data: { class1: class1, classList: this.classList },
      height: '100%',
      width: '70%',
      scrollStrategy: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClassList(null);
    });
  }

  getClassList(courseId: number) {
    this.schoolService.getClasses(courseId, null).subscribe(res => {
      this.classList = res;
      this.dataSource = new ClassListDataSource(this.paginator, this.sort, this.classList);
    });
  }

}
