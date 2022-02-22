import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeEmailComponent } from './confirme-email.component';

describe('ConfirmeEmailComponent', () => {
  let component: ConfirmeEmailComponent;
  let fixture: ComponentFixture<ConfirmeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
