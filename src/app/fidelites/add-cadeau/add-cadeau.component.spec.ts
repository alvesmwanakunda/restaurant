import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCadeauComponent } from './add-cadeau.component';

describe('AddCadeauComponent', () => {
  let component: AddCadeauComponent;
  let fixture: ComponentFixture<AddCadeauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCadeauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCadeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
