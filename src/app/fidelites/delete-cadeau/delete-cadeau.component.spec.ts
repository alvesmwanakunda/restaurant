import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCadeauComponent } from './delete-cadeau.component';

describe('DeleteCadeauComponent', () => {
  let component: DeleteCadeauComponent;
  let fixture: ComponentFixture<DeleteCadeauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCadeauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCadeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
