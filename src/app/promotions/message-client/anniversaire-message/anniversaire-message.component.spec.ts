import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnniversaireMessageComponent } from './anniversaire-message.component';

describe('AnniversaireMessageComponent', () => {
  let component: AnniversaireMessageComponent;
  let fixture: ComponentFixture<AnniversaireMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnniversaireMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnniversaireMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
