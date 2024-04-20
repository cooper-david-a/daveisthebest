import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private dataService: DataService;
  comments!: Comments;
  threads: number[] = [];
  relativeRoute = 'comments/';

  constructor(http: HttpClient) {
    this.dataService = new DataService(this.relativeRoute, http);
  }

  getComments(): Observable<void> {
    return this.dataService
      .getAll()
      .pipe(map((response) => response as Comment[]))
      .pipe(map((comments) => this.configureComments(comments)));
  }

  postComment(
    commentText: string,
    parentCommentId: number | null
  ): Observable<Comment> {
    let comment = { commentText: commentText, parentComment: parentCommentId};
    return this.dataService
      .create(comment)
      .pipe(map((response) => response as Comment));
  }

  private configureComments(comments: Comment[]) {
    let commentsObject: Comments = {};
    comments.forEach((comment) => {
      Object.assign(commentsObject, { [comment.id]: comment });

      if (!comment.parentComment) this.threads.push(comment.id);
    });

    this.comments = commentsObject;
  }
}

export interface Comment {
  id: number;
  okToDisplay: boolean;
  dateEntered: string;
  commenterName: string;
  commentText: string;
  parentComment: number | null;
  replies: number[];
}

export interface Comments {
  [id: number]: Comment;
}
