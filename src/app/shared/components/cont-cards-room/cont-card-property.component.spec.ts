import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContCardsPropertyComponent } from './cont-card-property.component';

describe('CardPropertyComponent', () => {
  let component: ContCardsPropertyComponent;
  let fixture: ComponentFixture<ContCardsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContCardsPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContCardsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
