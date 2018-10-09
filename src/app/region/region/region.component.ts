import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolService} from '../../shared/services/SchoolService';
import {County} from '../../shared/Models/County';
import {Country} from '../../shared/Models/Country';
import {UserDetailsComponent} from '../../users/user-list/user-details/user-details.component';
import {AddCountyComponent} from '../add-county/add-county.component';
import {SubCountyListComponent} from '../sub-county-list/sub-county-list.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

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
      width: '90%',
      data: {county: county}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
