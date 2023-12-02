import { Component, OnInit } from '@angular/core';
import { HiitTimerService, Schedule } from '../hiit-timer.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'hiit-timer-open-dialog',
  templateUrl: './hiit-timer-open-dialog.component.html',
  styleUrls: ['./hiit-timer-open-dialog.component.scss'],
})
export class HiitTimerOpenDialogComponent implements OnInit {
  schedules!: Schedule[];
  dataSource!: MatTableDataSource<Schedule>;
  displayedColumns: string[] = ['id', 'profile', 'title']

  constructor(private service: HiitTimerService) {}

  ngOnInit(): void {
    this.service.getTimers().subscribe((schedules) => {
      this.schedules = schedules;
      this.dataSource = new MatTableDataSource(schedules);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
