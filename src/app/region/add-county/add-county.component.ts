import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SchoolService} from '../../shared/services/SchoolService';
import {County} from '../../shared/Models/County';
import {Country} from '../../shared/Models/Country';

@Component({
  selector: 'app-add-county',
  templateUrl: './add-county.component.html',
  styleUrls: ['./add-county.component.css']
})
export class AddCountyComponent implements OnInit {

  county: County = new County();

  country: Country = new Country();

  constructor(private dialogRef: MatDialogRef<AddCountyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private schoolService: SchoolService) { }

  ngOnInit() {
    if (this.data !== null) {
      console.log(this.data);
      this.country = this.data['country'];
      this.county.country = new Country();
      this.county.country.id = this.country.id;
    }
  }

  postCounty() {
    this.schoolService.postCounty(this.county).subscribe(res => {
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
