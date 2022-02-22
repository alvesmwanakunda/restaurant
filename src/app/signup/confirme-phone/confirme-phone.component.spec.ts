import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmePhoneComponent } from './confirme-phone.component';

describe('ConfirmePhoneComponent', () => {
  let component: ConfirmePhoneComponent;
  let fixture: ComponentFixture<ConfirmePhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmePhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
