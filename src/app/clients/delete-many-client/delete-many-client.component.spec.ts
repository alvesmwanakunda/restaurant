import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManyClientComponent } from './delete-many-client.component';

describe('DeleteManyClientComponent', () => {
  let component: DeleteManyClientComponent;
  let fixture: ComponentFixture<DeleteManyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManyClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
