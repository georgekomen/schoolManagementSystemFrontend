import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCountyListComponent } from './sub-county-list.component';

describe('SubCountyListComponent', () => {
  let component: SubCountyListComponent;
  let fixture: ComponentFixture<SubCountyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCountyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCountyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
