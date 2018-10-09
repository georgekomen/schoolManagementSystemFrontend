import {Component, Inject, OnInit} from '@angular/core';
import {County} from '../../shared/Models/County';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Country} from '../../shared/Models/Country';
import {AddCountyComponent} from '../add-county/add-county.component';
import {SchoolService} from '../../shared/services/SchoolService';
import {Subcounty} from '../../shared/Models/Subcounty';

@Component({
  selector: 'app-add-sub-county',
  templateUrl: './add-sub-county.component.html',
  styleUrls: ['./add-sub-county.component.css']
})
export class AddSubCountyComponent implements OnInit {
  county: County = new County();

  subcounty: Subcounty = new Subcounty();

  constructor(private dialogRef: MatDialogRef<AddSubCountyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private schoolService: SchoolService) { }

  ngOnInit() {
    if (this.data !== null) {
      console.log(this.data);
      this.county = this.data['county'];
      this.subcounty.county = new County();
      this.subcounty.county.id = this.county.id;
    }
  }

  postSubCounty() {
    this.schoolService.postSubCounty(this.subcounty).subscribe(res => {

    });
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
