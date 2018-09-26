import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { PermissionListDataSource } from './permission-list-datasource';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Permission} from '../../shared/Models/permission';
import {AddPermissionComponent} from './add-permission/add-permission.component';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PermissionListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description'];

  permissionList: Permission[] = [];

  constructor(private permissionService: AuthenticationService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getPermissionList();
  }

  getPermissionList() {
    this.permissionService.getPermissions().subscribe(res => {
      this.permissionList = res;
      this.dataSource = new PermissionListDataSource(this.paginator, this.sort, this.permissionList);
    });
  }

  addPermission() {
    const dialogRef = this.dialog.open(AddPermissionComponent, {
      // width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPermissionList();
    });
  }

}
