import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEntrepriseComponent } from './link-entreprise.component';

describe('LinkEntrepriseComponent', () => {
  let component: LinkEntrepriseComponent;
  let fixture: ComponentFixture<LinkEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
