import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments!: { [key: number]: Comment };
  threads!: { [key: number]: Comment };

  constructor(private service: CommentsService) {}

  ngOnInit(): void {
    this.service.getComments().subscribe((comments) => {
      [this.comments, this.threads] = this.configureCommentsAsObject(comments);
    });
  }

  configureCommentsAsObject(comments: Comment[]): { [key: string]: Comment }[] {
    let commentsObject: { [key: number]: Comment } = {};
    let threads: { [key: number]: Comment } = {};
    comments.forEach((comment) => {
      let newObject = { [comment.id]: comment };
      Object.assign(commentsObject, newObject);
      if (!comment.parent_comment) {
        Object.assign(threads, newObject);
      }
    });
    return [commentsObject, threads];
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
