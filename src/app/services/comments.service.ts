import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { Comment } from '../comments/comments.component';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private dataService: DataService;

  constructor(http: HttpClient) {
    this.dataService = new DataService('http://localhost:8000/comments/', http);
  }

  getComments(): Observable<Comment[]> {
    return this.dataService
      .getAll()
      .pipe(map((response) => response as Comment[]));
  }
}
