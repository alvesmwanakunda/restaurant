import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReductionComponent } from './update-reduction.component';

describe('UpdateReductionComponent', () => {
  let component: UpdateReductionComponent;
  let fixture: ComponentFixture<UpdateReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
