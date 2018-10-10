import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SchoolService} from '../../../shared/services/SchoolService';
import {Course} from '../../../shared/Models/course';
import {Subject1} from '../../../shared/Models/Subject1';
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
  subjects: Subject1[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subjectCtrl = new FormControl();
  filteredSubjects: Observable<Subject1[]>;
  selectedSubjects: Subject1[] = [];
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

  remove(fruit: Subject1): void {
    const index = this.selectedSubjects.indexOf(fruit);

    if (index >= 0) {
      this.selectedSubjects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // we get an id
    console.log(event.option.viewValue);
    const sub = this.subjects.find(rr => rr.name === event.option.viewValue);
    this.selectedSubjects.push(sub);
    console.log(this.selectedSubjects);
    this.subjectInput.nativeElement.value = '';
    this.subjectCtrl.setValue(null);
  }

  private _filter(value: string): Subject1[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
