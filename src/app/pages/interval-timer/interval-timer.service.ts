import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, concat, map, take } from 'rxjs';

import { DataService } from '../../services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IntervalTimerService {
  relativeRoute: string = 'interval-timer/schedules/';
  private dataService: DataService;
  schedules: Schedule[] = [];
  MAX_ALLOWED_SCHEDULES = 10;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.dataService = new DataService(this.relativeRoute, http);
  }

  getSchedules(): Observable<void> {
    return this.dataService.getAll().pipe(
      map((response) => response as Schedule[]),
      map((schedules) => {
        this.schedules = schedules;
      }),take(1)
    );
  }

  createSchedule(schedule: Schedule) {
    if (this.authService.isLoggedIn) return this.dataService.create(schedule);
    return new Observable<Object>();
  }

  updateSchedule(id:number, schedule: Schedule) {
    if (this.authService.isLoggedIn) return this.dataService.update(id,schedule);
    return new Observable<Object>();
  }

  deleteSchedule(schedule: Schedule) {
    return concat(
      this.dataService.delete(schedule.id ?? 0),
      this.getSchedules()
    );
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
