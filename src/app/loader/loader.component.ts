import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../shared/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading = false;

  constructor(private loader: LoaderService) {
  }

  ngOnInit() {
    this.loader.loading.subscribe(value => {
      this.loading = value;
    });
  }

}
