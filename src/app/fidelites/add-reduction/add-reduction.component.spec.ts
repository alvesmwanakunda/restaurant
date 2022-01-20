import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReductionComponent } from './add-reduction.component';

describe('AddReductionComponent', () => {
  let component: AddReductionComponent;
  let fixture: ComponentFixture<AddReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
