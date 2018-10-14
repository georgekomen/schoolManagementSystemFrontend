import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {Country} from '../../shared/Models/Country';
import {County} from '../../shared/Models/County';
import {SchoolService} from '../../shared/services/SchoolService';
import {SubCountyListComponent} from '../../region/sub-county-list/sub-county-list.component';
import {AddCountyComponent} from '../../region/add-county/add-county.component';
import {EventsService} from '../../shared/services/events.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  displayedColumns: string[] = ['filter', 'icons'];

  dataSource = new MatTableDataSource<County>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private schoolService: SchoolService,
              private dialog: MatDialog,
              private event: EventsService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.event.subscribe('classExamId', data => this.getStudentExams(data));
  }

  getStudentExams(classExamId: number) {
    this.schoolService.getStudentExam(classExamId).subscribe(res => {
      this.dataSource =  new MatTableDataSource<County>(res);
    });
  }

}
