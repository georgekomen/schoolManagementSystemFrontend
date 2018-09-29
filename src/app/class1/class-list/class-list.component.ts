import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
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
  displayedColumns = ['id', 'name'];


  classList: Class1[] = [];

  constructor(private schoolService: SchoolService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getClassList();
  }

  addClass1() {
    const dialogRef = this.dialog.open(AddClassComponent, {
      // width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClassList();
    });
  }

  getClassList() {
    this.schoolService.getClasses().subscribe(res => {
      this.classList = res;
      this.dataSource = new ClassListDataSource(this.paginator, this.sort, this.classList);
    });
  }

}
