import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SchoolDataSource } from './school-list-datasource';
import {SchoolService} from '../shared/SchoolService';

@Component({
  selector: 'app-table-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SchoolDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private schoolService: SchoolService) {

  }

  ngOnInit() {
    this.dataSource = new SchoolDataSource(this.paginator, this.sort, this.schoolService);
  }
}
