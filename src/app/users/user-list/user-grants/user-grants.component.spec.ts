
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGrantsComponent } from './user-grants.component';

describe('UserGrantsComponent', () => {
  let component: UserGrantsComponent;
  let fixture: ComponentFixture<UserGrantsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
