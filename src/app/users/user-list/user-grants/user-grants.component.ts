import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserGrantsDataSource } from './user-grants-datasource';
import {UserService} from '../../../shared/services/user.service';
import {Grant} from '../../../shared/Models/grant';

@Component({
  selector: 'app-user-grants',
  templateUrl: './user-grants.component.html',
  styleUrls: ['./user-grants.component.css']
})
export class UserGrantsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserGrantsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  grantList: Grant[] = [];

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getGrants();
  }

  getGrants() {
    this.userService.getUsers().subscribe(res => {
      this.grantList = res;
      this.dataSource = new UserGrantsDataSource(this.paginator, this.sort, this.grantList);
    });
  }

}
