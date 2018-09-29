import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { UserListDataSource } from './user-list-datasource';
import {SchoolControllerComponent} from '../../school/school-list/school-controller/school-controller.component';
import {SchoolDataSource} from '../../school/school-list/school-list-datasource';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/Models/user';
import {UserDetailsComponent} from './user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'phoneNumber', 'email', 'gender'];

  userList: User[] = [];

  constructor(private userService: UserService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe(res => {
      this.userList = res;
      this.dataSource = new UserListDataSource(this.paginator, this.sort, this.userList);
    });
  }

  userDetails(user: User) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      // data: { user: }
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }
}