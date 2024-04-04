import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiitTimerOpenDialogComponent } from './hiit-timer-open-dialog.component';

describe('HiitTimerOpenDialogComponent', () => {
  let component: HiitTimerOpenDialogComponent;
  let fixture: ComponentFixture<HiitTimerOpenDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HiitTimerOpenDialogComponent]
});
    fixture = TestBed.createComponent(HiitTimerOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
