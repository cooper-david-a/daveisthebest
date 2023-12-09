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
    warmup: new FormControl<number>(0, [
      Validators.min(0),
      Validators.required,
    ]),
    cooldown: new FormControl<number>(0, [
      Validators.min(0),
      Validators.required,
    ]),
    rows: new FormArray<FormGroup>([
      new FormGroup({
        hard: new FormControl<number>(0, [
          Validators.required,
          Validators.min(0),
        ]),
        easy: new FormControl<number>(0, [
          Validators.required,
          Validators.min(0),
        ]),
        rounds: new FormControl<number>(1, [
          Validators.required,
          Validators.min(1),
        ]),
      }),
    ]),
  });

  running: boolean = false;
  displayedColumns: string[] = ['hard', 'easy', 'rounds'];
  @ViewChild(MatTable) table!: MatTable<Row>;

  constructor(
    public openTimerDialog: MatDialog,
    private service: HiitTimerService
  ) {}

  playPause() {}
  stop() {}

  get rows() {
    return this.scheduleForm.controls.rows as FormArray;
  }

  addRow(
    newRow = new FormGroup({
      hard: new FormControl<number>(0, [
        Validators.min(0),
        Validators.required,
      ]),
      easy: new FormControl<number>(0, [
        Validators.min(0),
        Validators.required,
      ]),
      rounds: new FormControl<number>(1, [
        Validators.min(1),
        Validators.required,
      ]),
    })
  ) {
    this.rows.push(newRow);
    this.table.renderRows();
  }

  deleteRow() {
    const numRows = this.rows.length;
    if (numRows > 1) {
      this.rows.removeAt(numRows - 1);
      this.table.renderRows();
    }
  }

  saveTimer() {}

  openTimer() {
    const dialogRef = this.openTimerDialog.open(HiitTimerOpenDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((schedule: Schedule) => {
      if (schedule) {
        let numOldRows = this.rows.length;
        let numNewRows = schedule.rows.length;
        while (numNewRows != numOldRows) {
          if (numNewRows > numOldRows) {
            this.addRow();
            numOldRows = this.rows.length;
          }
          if (numNewRows < numOldRows) {
            this.deleteRow();
            numOldRows = this.rows.length;
          }
        }

        this.scheduleForm.setValue({
          warmup: schedule.warmup,
          cooldown: schedule.cooldown,
          rows: schedule.rows.map((row: Row) => ({
            hard: row.hard,
            easy: row.easy,
            rounds: row.rounds,
          })),
        });
      }
    });
  }
}
