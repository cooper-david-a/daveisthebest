import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  url: string = 'http://localhost:8000/comments/';
  private dataService: DataService;
  comments!: Comments;
  threads: number[] = [];

  constructor(http: HttpClient) {
    this.dataService = new DataService(this.url, http);
  }

  getComments(): Observable<void> {
    return this.dataService
      .getAll()
      .pipe(map((response) => response as Comment[]))
      .pipe(map((comments) => this.configureComments(comments)));
  }

  private configureComments(comments: Comment[]) {
    let commentsObject: Comments = {};
    comments.forEach((comment) => {
      Object.assign(commentsObject, { [comment.id]: comment });

      if (!comment.parent_comment) this.threads.push(comment.id);
    });

    this.comments = commentsObject;
  }
}

export interface Comment {
  id: number;
  ok_to_display: boolean;
  date_entered: string;
  commenter_name: string;
  comment_text: string;
  parent_comment: number | null;
  replies: number[];
}

export interface Comments {
  [id: number]: Comment;
}
