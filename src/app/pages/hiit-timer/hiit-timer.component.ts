import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { HiitTimerOpenDialogComponent } from './hiit-timer-open-dialog/hiit-timer-open-dialog.component';
import { HiitTimerService, Schedule, Row } from './hiit-timer.service';

@Component({
  selector: 'hiit-timer',
  templateUrl: './hiit-timer.component.html',
  styleUrls: ['./hiit-timer.component.scss'],
})
export class HiitTimerComponent {
  running: boolean = false;
  displayedColumns: string[] = ['hard', 'easy', 'rounds'];
  @ViewChild(MatTable) table!: MatTable<Row>;

  currentSchedule: Schedule = {
    id: 0,
    profile: '',
    title: 'default',
    warmup: 0,
    cooldown: 0,
    rows: [{ id: 0, hard: 360, easy: 60, rounds: 10 }],
  };

  constructor(
    public openTimerDialog: MatDialog,
    private service: HiitTimerService
  ) {}

  playPause() {}
  stop() {}

  addRow() {
    this.currentSchedule.rows.push({ id: 0, hard: 60, easy: 60, rounds: 1 });
    this.table.renderRows();
  }

  deleteRow() {
    if (this.currentSchedule.rows.length > 1) {
      this.currentSchedule.rows.pop();
      this.table.renderRows();
    }
  }

  saveTimer() {}

  openTimer() {
    const dialogRef = this.openTimerDialog.open(HiitTimerOpenDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((schedule: Schedule) => {
      if (schedule) this.currentSchedule = schedule;
    });
  }
}
