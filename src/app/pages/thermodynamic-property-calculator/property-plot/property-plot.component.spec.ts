import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPlotComponent } from './property-plot.component';

describe('PropertyPlotComponent', () => {
  let component: PropertyPlotComponent;
  let fixture: ComponentFixture<PropertyPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPlotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
