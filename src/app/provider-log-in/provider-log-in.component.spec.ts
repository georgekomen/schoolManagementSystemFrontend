import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLogInComponent } from './provider-log-in.component';

describe('ProviderLogInComponent', () => {
  let component: ProviderLogInComponent;
  let fixture: ComponentFixture<ProviderLogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderLogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
