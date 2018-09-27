import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserGrantsDataSource } from './user-grants-datasource';
import {UserService} from '../../../shared/services/user.service';
import {Grant} from '../../../shared/Models/grant';
import {User} from '../../../shared/Models/user';

@Component({
  selector: 'app-user-grants',
  templateUrl: './user-grants.component.html',
  styleUrls: ['./user-grants.component.css']
})
export class UserGrantsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserGrantsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  grantList: Grant[] = [];

  user: User;

  @Input() set _user(_user: User) {
    this.user = _user;
    if (this.user.id > 0) {
      this.getGrants();
    }
  }

  constructor(private userService: UserService) {

  }


  getGrants() {
    this.userService.getUserGrants(this.user).subscribe(res => {
      this.grantList = res;
      console.log(this.grantList);
      this.dataSource = new UserGrantsDataSource(this.paginator, this.sort, this.grantList);
    });
  }

}
