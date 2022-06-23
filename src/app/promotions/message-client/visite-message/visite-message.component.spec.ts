import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteMessageComponent } from './visite-message.component';

describe('VisiteMessageComponent', () => {
  let component: VisiteMessageComponent;
  let fixture: ComponentFixture<VisiteMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
