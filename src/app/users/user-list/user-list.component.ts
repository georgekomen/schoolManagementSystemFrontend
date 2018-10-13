import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatSort} from '@angular/material';
import { UserListDataSource } from './user-list-datasource';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/Models/user';
import {UserDetailsComponent} from './user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'name', 'phoneNumber', 'email', 'gender', 'icons'];

  displayForStudent = ['select', 'name', 'gender', 'icons'];

  displayForEmployee = ['select', 'name', 'phoneNumber', 'email', 'gender', 'icons'];

  userList: User[] = [];

  constructor(private userService: UserService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    // display for student
    this.displayedColumns = this.displayForStudent;
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe(res => {
      this.userList = res;
      this.dataSource = new UserListDataSource(this.sort, this.userList);
    });
  }

  userDetails(user: User) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { user: user},
      height: '100%',
      width: '90%',
      scrollStrategy: null
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '100%',
      width: '90%',
      scrollStrategy: null
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }
}
