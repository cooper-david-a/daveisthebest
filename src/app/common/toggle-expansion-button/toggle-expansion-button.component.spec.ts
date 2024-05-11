import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleExpansionButtonComponent } from './toggle-expansion-button.component';

describe('ToggleExpansionButtonComponent', () => {
  let component: ToggleExpansionButtonComponent;
  let fixture: ComponentFixture<ToggleExpansionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleExpansionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleExpansionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
