import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolControllerComponent } from './school-controller.component';

describe('SchoolControllerComponent', () => {
  let component: SchoolControllerComponent;
  let fixture: ComponentFixture<SchoolControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
