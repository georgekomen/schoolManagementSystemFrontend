import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerprintVerificationComponent } from './fingerprint-verification.component';

xdescribe('FingerprintVerificationComponent', () => {
  let component: FingerprintVerificationComponent;
  let fixture: ComponentFixture<FingerprintVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FingerprintVerificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FingerprintVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
