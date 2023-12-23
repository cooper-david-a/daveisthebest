import { Component, EventEmitter, OnInit} from '@angular/core';
import { HiitTimerService, Schedule } from '../hiit-timer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'hiit-timer-open-dialog',
  templateUrl: './hiit-timer-open-dialog.component.html',
  styleUrls: ['./hiit-timer-open-dialog.component.scss'],
})
export class HiitTimerOpenDialogComponent implements OnInit {
  schedules!: Schedule[];
  dataSource!: MatTableDataSource<Schedule>;
  displayedColumns: string[] = ['creator', 'title'];
  isLoading = true;
  selectedSchedule = new EventEmitter();

  constructor(private service: HiitTimerService, public dialogRef: MatDialogRef<HiitTimerOpenDialogComponent>) {}

  ngOnInit(): void {
    this.service.getSchedules().subscribe((schedules) => {
      this.schedules = schedules;
      this.dataSource = new MatTableDataSource(schedules);
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadSchedule(schedule:Schedule){
    this.dialogRef.close(schedule);
  }
}
