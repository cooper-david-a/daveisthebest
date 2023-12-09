import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
  scheduleForm = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    }),
    warmup: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.required],
      nonNullable: true,
    }),
    cooldown: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.required],
      nonNullable: true,
    }),
    rows: new FormArray([this.rowFactory()]),
  });

  running: boolean = false;
  displayedColumns: string[] = ['hard', 'easy', 'rounds'];
  @ViewChild(MatTable) table!: MatTable<Row>;

  constructor(
    public openScheduleDialog: MatDialog,
    private service: HiitTimerService
  ) {}

  playPause() {}
  stop() {}

  rowFactory() {
    return new FormGroup({
      hard: new FormControl<number>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true,
      }),
      easy: new FormControl<number>(0, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true,
      }),
      rounds: new FormControl<number>(1, {
        validators: [Validators.required, Validators.min(1)],
        nonNullable: true,
      }),
    });
  }

  get rows() {
    return this.scheduleForm.controls.rows;
  }

  addRow(update: boolean = false, newRow = this.rowFactory()) {
    this.rows.push(newRow);
    if (update) this.table.renderRows();
  }

  deleteRow(update: boolean = false) {
    const numRows = this.rows.length;
    if (numRows > 1) {
      this.rows.removeAt(numRows - 1);
      if (update) this.table.renderRows();
    }
  }

  clearRows() {
    while (this.rows.length > 1) this.deleteRow();
  }

  saveSchedule() {
    if (this.scheduleForm.valid) {
      this.service.saveSchedule(this.scheduleForm.getRawValue());
    }
  }

  openSchedule() {
    const dialogRef = this.openScheduleDialog.open(
      HiitTimerOpenDialogComponent,
      {
        width: '80vw',
      }
    );

    dialogRef.afterClosed().subscribe((schedule: Schedule) => {
      if (schedule) {
        delete schedule.id;
        delete schedule.profile;
        this.clearRows();
        schedule.rows.forEach((row, index) => {
          delete row.id;
          if (index >= this.rows.length) this.addRow();
        });
        this.scheduleForm.setValue(schedule);
        this.table.renderRows();
      }
    });
  }
}
