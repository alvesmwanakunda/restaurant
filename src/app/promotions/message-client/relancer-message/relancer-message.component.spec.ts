import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelancerMessageComponent } from './relancer-message.component';

describe('RelancerMessageComponent', () => {
  let component: RelancerMessageComponent;
  let fixture: ComponentFixture<RelancerMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelancerMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelancerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
