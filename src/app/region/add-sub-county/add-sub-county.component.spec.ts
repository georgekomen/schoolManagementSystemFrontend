import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCountyComponent } from './add-sub-county.component';

describe('AddSubCountyComponent', () => {
  let component: AddSubCountyComponent;
  let fixture: ComponentFixture<AddSubCountyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubCountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
