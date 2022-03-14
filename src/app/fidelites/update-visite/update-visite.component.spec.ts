import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisiteComponent } from './update-visite.component';

describe('UpdateVisiteComponent', () => {
  let component: UpdateVisiteComponent;
  let fixture: ComponentFixture<UpdateVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
