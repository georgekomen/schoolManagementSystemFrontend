import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { UserListDataSource } from './user-list-datasource';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/Models/user';
import {UserDetailsComponent} from './user-details/user-details.component';
import {EventsService} from '../../shared/services/events.service';

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

  displayForStudent = ['name', 'gender'];

  displayForEmployee = ['name', 'phoneNumber', 'email', 'gender'];

  userList: User[] = [];

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private events: EventsService) {

  }

  ngOnInit() {
    // display for student
    this.displayedColumns = this.displayForStudent;
    this.getUserList();
    this.events.subscribe('schoolList', (data) => {

    });
  }

  getUserList() {
    this.userService.getUsers().subscribe(res => {
      this.userList = res;
      this.dataSource = new UserListDataSource(this.paginator, this.sort, this.userList);
    });
  }

  userDetails(user: User) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { user: user},
      height: '100%',
      width: '70%',
      scrollStrategy: null
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '100%',
      width: '70%',
      scrollStrategy: null
      });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserList();
    });
  }
}
