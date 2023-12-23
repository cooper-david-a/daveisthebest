import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { DataService } from '../../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class HiitTimerService {
  relativeRoute: string = 'hiit-timer/schedules/';
  private dataService: DataService;
  timers!: Schedule[];

  constructor(http: HttpClient) {
    this.dataService = new DataService(this.relativeRoute, http);
  }

  getSchedules(): Observable<Schedule[]> {
    return this.dataService
      .getAll()
      .pipe(map((response) => response as Schedule[]));
  }

  saveSchedule(schedule: Schedule) {
    this.dataService.create(schedule).subscribe((data) => console.log(data));
  }
}

export interface Schedule {
  id?: number;
  scheduleCreator?: string;
  title: string;
  warmupDescription: string;
  warmup: number;
  cooldownDescription: string;
  cooldown: number;
  rows: Row[];
}

export interface Row {
  id?: number;
  hardDescription: string;
  hard: number;
  easyDescription: string;
  easy: number;
  rounds: number;
}
