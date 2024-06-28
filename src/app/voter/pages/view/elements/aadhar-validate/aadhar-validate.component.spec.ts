import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharValidateComponent } from './aadhar-validate.component';

describe('AadharValidateComponent', () => {
  let component: AadharValidateComponent;
  let fixture: ComponentFixture<AadharValidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharValidateComponent]
    });
    fixture = TestBed.createComponent(AadharValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
