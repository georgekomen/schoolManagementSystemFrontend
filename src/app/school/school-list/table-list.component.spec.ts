
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListComponent } from './school-list.component';

describe('TableListComponent', () => {
  let component: SchoolListComponent;
  let fixture: ComponentFixture<SchoolListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
