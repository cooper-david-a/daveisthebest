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
    rows: new FormArray<FormGroup>([
      new FormGroup({
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
      }),
    ]),
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

  saveSchedule() {
    if (this.scheduleForm.valid) {
      let formValue = this.scheduleForm.value;

      let schedule = {
        title: formValue.title ? formValue.title : '',
        warmup: formValue.warmup ? formValue.warmup : 0,
        cooldown: formValue.cooldown ? formValue.cooldown : 0,
        rows: formValue.rows
          ? formValue.rows.map(this.convertRowToObject)
          : [{ hard: 0, easy: 0, rounds: 0 }],
      };

      this.service.saveSchedule(schedule);
    }
  }

  convertRowToObject(row: Row) {
    return{
    hard: row.hard ? row.hard : 0,
    easy: row.easy ? row.easy : 0,
    rounds: row.rounds ? row.rounds : 0
    } as Row
  };

  openSchedule() {
    const dialogRef = this.openScheduleDialog.open(
      HiitTimerOpenDialogComponent,
      {
        width: '80vw',
      }
    );

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
          title: schedule.title,
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


