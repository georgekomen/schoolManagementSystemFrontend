import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {School, SchoolDataSource} from './school-list-datasource';
import {SchoolService} from '../shared/services/SchoolService';

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

  constructor(private schoolService: SchoolService) {

  }

  getDataSourceLength(): number {
    let d = this.dataSource !== undefined ? this.dataSource.schoolList.length : 0;
    return d;
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
}
