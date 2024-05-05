import { Injectable, computed, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  dataService = new DataService('comments/', inject(HttpClient));

  comments = signal<CommentsObject>({});
  threads = computed<Comment[]>(() =>
    Object.values(this.comments())
      .flatMap((comment) => (!comment.parentComment ? [comment] : []))
      .reverse()
  );
  expandedReplies = new Set<number>([]);

  constructor() {
    this.getComments().subscribe();
  }

  getComments(): Observable<void> {
    return this.dataService.getAll().pipe(
      map((response) => response as Comment[]),
      map((commentsArray) => this.configureComments(commentsArray))
    );
  }

  postComment(comment: PostComment): Observable<Comment> {
    return this.dataService
      .create(comment)
      .pipe(map((response) => response as Comment),tap((comment)=>this.getComments().subscribe()));
  }

  private configureComments(commentsArray: Comment[]) {
    let commentsObject: CommentsObject = {};
    commentsArray.forEach((comment) => {
      Object.assign(commentsObject, { [comment.id]: comment });
    });
    this.comments.set(commentsObject);
  }
}

export interface Comment {
  id: number;
  okToDisplay: boolean;
  dateEntered: string;
  commenter: string;
  commentText: string;
  parentComment: number | null;
  replies: number[];
}

export interface PostComment {
  commentText: string;
  parentComment: number | null;
}

interface CommentsObject {
  [id: number]: Comment;
}
