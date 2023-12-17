import { Component, OnInit, ViewChild } from '@angular/core';
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
export class HiitTimerComponent implements OnInit{
  scheduleForm = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    }),
    warmupDescription: new FormControl<string>('Warmup', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    }),
    warmup: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.required],
      nonNullable: true,
    }),
    cooldownDescription: new FormControl<string>('Cooldown', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    }),
    cooldown: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.required],
      nonNullable: true,
    }),
    rows: new FormArray([this.rowFactory()]),
  });

  warmupCooldownDescShown = false;

  running = false;
  startTime!: number;
  timeRemaining = 0;
  totalTime = 0;
  timeElapsed = 0;
  savedTimeElapsed = 0;
  roundTimeRemaining = 0;
  flatRoundsArray: Round[] = [];
  elapsedTimeBreakpointArray: number[] = [];
  roundIndex = 0;
  timer!: NodeJS.Timeout;
  progress = 0;
  bell = new Audio('../assets/Bell.wav');

  displayedColumns = ['expand', 'hard', 'easy', 'rounds'];
  expandedRowIndex!: number | null;
  @ViewChild(MatTable) table!: MatTable<Row>;

  constructor(
    public openScheduleDialog: MatDialog,
    private service: HiitTimerService
  ) {}

  ngOnInit(): void {
    this.generateTimer();
  }

  rowFactory() {
    return new FormGroup({
      hardDescription: new FormControl<string>('Hard', {
        validators: [Validators.required, Validators.maxLength(100)],
        nonNullable: true,
      }),
      hard: new FormControl<number>(60, {
        validators: [Validators.required, Validators.min(0)],
        nonNullable: true,
      }),
      easyDescription: new FormControl<string>('Easy', {
        validators: [Validators.required, Validators.maxLength(100)],
        nonNullable: true,
      }),
      easy: new FormControl<number>(60, {
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
        console.log(schedule);
        delete schedule.id;
        delete schedule.profile;
        while (schedule.rows.length < this.rows.length) this.deleteRow();
        while (schedule.rows.length > this.rows.length) this.addRow();
        schedule.rows.forEach((row) => delete row.id);
        this.scheduleForm.setValue(schedule);
        this.table.renderRows();
        this.generateTimer();
      }
    });
  }

  generateTimer() {
    if (
      this.scheduleForm.controls.warmup.valid &&
      this.scheduleForm.controls.rows.valid &&
      this.scheduleForm.controls.cooldown.valid
    ) {
      let schedule = this.scheduleForm.getRawValue();

      this.flatRoundsArray = [];
      this.elapsedTimeBreakpointArray = [];

      if (schedule.warmup) {
        this.flatRoundsArray[0] = {
          description: schedule.warmupDescription,
          duration: schedule.warmup,
        };
      }
      for (let row of schedule.rows) {
        for (let i = 0; i < row.rounds; i++) {
          this.flatRoundsArray.push({
            description: row.hardDescription,
            duration: row.hard,
          });
          this.flatRoundsArray.push({
            description: row.easyDescription,
            duration: row.easy,
          });
        }
        if (schedule.cooldown) {
          this.flatRoundsArray.push({
            description: schedule.cooldownDescription,
            duration: schedule.cooldown,
          });
        }

        this.elapsedTimeBreakpointArray = this.flatRoundsArray.map(
          (
            (sum) => (round) =>
              (sum += round.duration)
          )(0)
        );

        this.timeRemaining =
          this.elapsedTimeBreakpointArray[
            this.elapsedTimeBreakpointArray.length - 1
          ];

        this.totalTime = this.timeRemaining;
        this.roundTimeRemaining = this.elapsedTimeBreakpointArray[0];
        this.timeElapsed = 0;
      }
    }
  }

  playPause() {
    this.running = !this.running;
    if (!this.running) this.pause();
    if (this.running) this.play();
  }

  play() {
    this.bell.play();
    this.startTime = new Date().getTime();
    this.timer = setInterval(() => this.update(), 100);
  }

  pause() {
    clearInterval(this.timer);
    this.savedTimeElapsed = this.timeElapsed;
  }

  update() {
    if (this.running) {
      let oldRoundIndex = this.roundIndex;
      let now = new Date().getTime();
      this.timeElapsed = this.savedTimeElapsed + (now - this.startTime) / 1000;
      this.timeRemaining = this.totalTime - this.timeElapsed;
      this.roundIndex = this.elapsedTimeBreakpointArray.findIndex(
        (t) => t > this.timeElapsed
      );
      if (this.roundIndex > oldRoundIndex) this.bell.play();
      this.roundTimeRemaining =
        this.flatRoundsArray[this.roundIndex].duration - this.timeElapsed;
      this.progress = (this.timeElapsed / this.totalTime) * 100;
      if (this.roundIndex < 0) {
        this.bell.play();
        this.stop();
      }
    }
  }

  stop() {
    clearInterval(this.timer);
    this.running = false;
    this.roundIndex = 0;
    this.generateTimer();
  }
}

interface Round {
  description: string;
  duration: number;
}
