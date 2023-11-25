import { Component } from '@angular/core';

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

  playPause() {}
  stop() {}
  addRow() {}
  deleteRow() {}
  openTimer() {}
  saveTimer() {}
}

interface Row {
  id: number;
  hard: number;
  easy: number;
  rounds: number;
}
