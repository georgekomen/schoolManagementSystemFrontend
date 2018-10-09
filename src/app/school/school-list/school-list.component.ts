import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort} from '@angular/material';
import {SchoolDataSource} from './school-list-datasource';
import {SchoolService} from '../../shared/services/SchoolService';
import {AddSchoolComponent} from './add-school/add-school-.component';
import {School} from '../../shared/Models/school';
import {Subcounty} from '../../shared/Models/Subcounty';

@Component({
  selector: 'app-table-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SchoolDataSource;
  schoolList: School[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'date_registered', 'icons'];

  subCounty: Subcounty;

  constructor(private schoolService: SchoolService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    if (this.data !== null) {
      this.subCounty = this.data['subCounty'];
      this.getSchoolList();
    }
  }

  getSchoolList() {
    this.schoolService.getSchools(this.subCounty.id).subscribe(res => {
      this.schoolList = res;
      this.dataSource = new SchoolDataSource(this.sort, this.schoolList);
    });
  }

  openSchool(school: School) {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      data: { school: school }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addSchool() {
    const dialogRef = this.dialog.open(AddSchoolComponent, {
      data: { subCounty: this.subCounty }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSchoolList();
    });
  }
}
