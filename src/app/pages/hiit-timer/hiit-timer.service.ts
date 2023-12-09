import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { DataService } from '../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class HiitTimerService {
  url: string = 'http://localhost:8000/hiit-timer/schedules';
  private dataService: DataService;
  timers!: Schedule[];

  constructor(http: HttpClient) {
    this.dataService = new DataService(this.url, http);
  }

  getTimers(): Observable<Schedule[]> {
    return this.dataService
      .getAll()
      .pipe(map((response) => response as Schedule[]))
  }

}

export interface Schedule {
  id:number,
  profile:string,
  title:string,
  warmup:number,
  cooldown:number,
  rows:Row[]
}

export interface Row {
  id:number,
  hard:number,
  easy:number,
  rounds:number
}
