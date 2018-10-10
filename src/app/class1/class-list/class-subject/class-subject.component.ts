import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SchoolService} from '../../../shared/services/SchoolService';
import {Course} from '../../../shared/Models/course';
import {Subject1} from '../../../shared/Models/Subject1';
import {Class1} from '../../../shared/Models/Class1';
import {ClassSubject} from '../../../shared/Models/ClassSubject';
@Component({
  selector: 'app-class-subject',
  templateUrl: './class-subject.component.html',
  styleUrls: ['./class-subject.component.css']
})
export class ClassSubjectComponent implements OnInit {
  course: Course;
  @Input() set _course(_course: Course) {
    this.course = _course;
    this.getSubjects();
  }
  class1: Class1;
  @Input() set _class(_class: Class1) {
    this.class1 = _class;
    this.selectedSubjects = this.class1.classSubjects;
  }
  subjects: Subject1[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subjectCtrl = new FormControl();
  filteredSubjects: Observable<Subject1[]>;
  selectedSubjects: ClassSubject[] = [];
  @ViewChild('subjectInput') subjectInput: ElementRef<HTMLInputElement>;

  constructor(private schoolService: SchoolService) {

  }

  ngOnInit() {
    this.filteredSubjects = this.subjectCtrl.valueChanges
      .pipe(startWith(null),
      map((subject: string | null) => subject ? this._filter(subject) :
        this.subjects.slice()));
  }

  getSubjects() {
    this.schoolService.getSubjects(this.course.id).subscribe(res => {
      this.subjects = res;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our subject
    // if ((value || '').trim()) {
    //   this.selectedSubjects.push(value.trim());
    // }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.subjectCtrl.setValue(null);
  }

  remove(fruit: ClassSubject): void {
    const index = this.selectedSubjects.indexOf(fruit);

    if (index >= 0) {
      this.selectedSubjects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const sub = this.subjects.find(rr => rr.name === event.option.viewValue);


    // add in backend also
    const classSubject: ClassSubject = new ClassSubject();
    classSubject.class1 = new Class1();
    classSubject.class1.id = this.class1.id;
    classSubject.subject = new Subject1();
    classSubject.subject = sub;

    this.selectedSubjects.push(classSubject);
    this.subjectInput.nativeElement.value = '';
    this.subjectCtrl.setValue(null);

    this.schoolService.postClassSubject(classSubject).subscribe(res => {

    });
  }

  private _filter(value: string): Subject1[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
