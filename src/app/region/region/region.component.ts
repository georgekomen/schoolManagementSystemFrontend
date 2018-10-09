import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SchoolService} from '../../shared/services/SchoolService';
import {County} from '../../shared/Models/County';
import {Country} from '../../shared/Models/Country';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'icons'];

  dataSource = new MatTableDataSource<County>();

  countryList: Country[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.schoolService.getCountries().subscribe(res => {
      this.countryList = res;
      if (this.countryList.length > 0) {
        this.getCounties(this.countryList[0].id);
      }
    });
  }

  getCounties(countryId: number) {
    this.schoolService.getCounties(countryId).subscribe(res => {
      this.dataSource = new MatTableDataSource<County>(res);
    });
  }

  addCounty() {

  }

}
