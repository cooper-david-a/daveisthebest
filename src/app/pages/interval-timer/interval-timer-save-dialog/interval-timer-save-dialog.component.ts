import { Component, OnInit } from '@angular/core';
import { IntervalTimerService, Schedule } from '../interval-timer.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'interval-timer-save-dialog',
  templateUrl: './interval-timer-save-dialog.component.html',
  styleUrls: ['./interval-timer-save-dialog.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class IntervalTimerSaveDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<Schedule>;
  isLoading = true;
  isUpdating = false;
  dummySchedule = {
    id: 0,
    scheduleCreator: '',
    title: 'New Schedule',
    warmupDescription: 'warmup',
    warmup: 0,
    cooldownDescription: 'cooldown',
    cooldown: 0,
    rows: [
      {
        id: 0,
        hardDescription: 'hard',
        hard: 60,
        easyDescription: 'easy',
        easy: 60,
        rounds: 5,
      },
    ],
  };

  constructor(
    public service: IntervalTimerService,
    public dialogRef: MatDialogRef<IntervalTimerSaveDialogComponent>
  ) {}

  ngOnInit(): void {
    this.service.getSchedules().subscribe(() => {
      this.dataSource = new MatTableDataSource(this.service.schedules);
      this.isLoading = false;
    });
  }

  delete(schedule: Schedule) {
    this.isUpdating = true;
    this.service.deleteSchedule(schedule).subscribe(() => {
      this.dataSource.data = this.service.schedules;
      this.isUpdating = false;
    });
  }
}
