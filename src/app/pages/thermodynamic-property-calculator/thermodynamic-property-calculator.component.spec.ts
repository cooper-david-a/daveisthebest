import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermodynamicPropertyCalculatorComponent } from './thermodynamic-property-calculator.component';

describe('ThermodynamicPropertyCalculatorComponent', () => {
  let component: ThermodynamicPropertyCalculatorComponent;
  let fixture: ComponentFixture<ThermodynamicPropertyCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThermodynamicPropertyCalculatorComponent]
    });
    fixture = TestBed.createComponent(ThermodynamicPropertyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
