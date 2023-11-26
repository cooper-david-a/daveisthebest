import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HiitTimerOpenDialogComponent } from './hiit-timer-open-dialog/hiit-timer-open-dialog.component';

@Component({
  selector: 'hiit-timer',
  templateUrl: './hiit-timer.component.html',
  styleUrls: ['./hiit-timer.component.scss'],
})
export class HiitTimerComponent {
  readyToSave: boolean = false;
  running: boolean = false;
  rows: Row[] = [];
  displayedColumns: string[] = ['hard', 'easy', 'rounds'];
  roundTime: number = 0;
  elapsedTime: number = 0;
  remainingTime: number = 0;

  constructor(public openTimerDialog: MatDialog) {}

  playPause() {}
  stop() {}
  addRow() {}
  deleteRow() {}
  saveTimer() {}

  openTimer() {
    const dialogRef = this.openTimerDialog.open(HiitTimerOpenDialogComponent);
  }
}
interface Row {
  id: number;
  hard: number;
  easy: number;
  rounds: number;
}
