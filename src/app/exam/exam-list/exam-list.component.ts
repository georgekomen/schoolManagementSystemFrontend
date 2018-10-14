import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Country} from '../../shared/Models/Country';
import {County} from '../../shared/Models/County';
import {SchoolService} from '../../shared/services/SchoolService';
import {SubCountyListComponent} from '../../region/sub-county-list/sub-county-list.component';
import {AddCountyComponent} from '../../region/add-county/add-county.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'icons'];

  dataSource = new MatTableDataSource<County>();

  countryList: Country[] = [];

  selectedCountry: Country;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private schoolService: SchoolService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.schoolService.getCountries().subscribe(res => {
      this.countryList = res;
      if (this.countryList.length > 0) {
        this.selectedCountry = this.countryList[0];
        this.getCounties();
      }
    });
  }

  getCounties() {
    this.schoolService.getCounties(this.selectedCountry.id).subscribe(res => {
      this.dataSource = new MatTableDataSource<County>(res);
    });
  }

  addCounty() {
    const dialogRef = this.dialog.open(AddCountyComponent, {
      data: {country: this.selectedCountry}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCounties();
    });
  }

  getSubCounties(county: County) {
    const dialogRef = this.dialog.open(SubCountyListComponent, {
      height: '100%',
      width: '80%',
      data: {county: county}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
