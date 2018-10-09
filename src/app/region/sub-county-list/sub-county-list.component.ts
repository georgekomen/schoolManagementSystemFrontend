import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {County} from '../../shared/Models/County';
import {Country} from '../../shared/Models/Country';
import {SchoolService} from '../../shared/services/SchoolService';
import {Subcounty} from '../../shared/Models/Subcounty';
import {AddCountyComponent} from '../add-county/add-county.component';
import {AddSubCountyComponent} from '../add-sub-county/add-sub-county.component';

@Component({
  selector: 'app-sub-county-list',
  templateUrl: './sub-county-list.component.html',
  styleUrls: ['./sub-county-list.component.css']
})
export class SubCountyListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'icons'];

  dataSource = new MatTableDataSource<Subcounty>();

  @ViewChild(MatSort) sort: MatSort;

  county: County;

  constructor(private schoolService: SchoolService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    if (this.data !== null) {
      this.county = this.data['county'];
      this.getSubcounties();
    }
  }

  getSubcounties() {
    this.schoolService.getSubCounties(this.county.id).subscribe(res => {
      this.dataSource = new MatTableDataSource<Subcounty>(res);
    });
  }

  addSubCounty() {
    const dialogRef = this.dialog.open(AddSubCountyComponent, {
      data: {county: this.county}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
