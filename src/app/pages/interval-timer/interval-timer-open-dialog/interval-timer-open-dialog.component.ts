import {
  Component,
  EventEmitter,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IntervalTimerService, Schedule } from '../interval-timer.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'interval-timer-open-dialog',
  templateUrl: './interval-timer-open-dialog.component.html',
  styleUrls: ['./interval-timer-open-dialog.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class IntervalTimerOpenDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<Schedule>;
  displayedColumns: string[] = ['delete-button', 'title'];
  isLoading = true;
  isUpdating: any;

  constructor(
    public service: IntervalTimerService,
    public dialogRef: MatDialogRef<IntervalTimerOpenDialogComponent>
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
