import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {SchoolDataSource} from './school-list-datasource';
import {SchoolService} from '../../shared/services/SchoolService';
import {AddSchoolComponent} from './add-school/add-school-.component';
import {School} from '../../shared/Models/school';

@Component({
  selector: 'app-table-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SchoolDataSource;
  schoolList: School[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'date_registered'];

  constructor(private schoolService: SchoolService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getSchoolList();
  }

  getSchoolList() {
    this.schoolService.getSchools().subscribe(res => {
      this.schoolList = res;
      this.dataSource = new SchoolDataSource(this.paginator, this.sort, this.schoolList);
    });
  }

  addSchool() {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      // width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSchoolList();
    });
  }
}
