import { Component, OnInit } from '@angular/core';

import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments!: { [key: string]: Comment };

  constructor(private service: CommentsService) {}

  ngOnInit(): void {
    this.service.getComments().subscribe((comments) => {
      this.comments = this.configureCommentsAsObject(comments);
      console.log(comments);
    });
  }

  configureCommentsAsObject(comments: Comment[]): { [key: string]: Comment } {
    let commentsObject!: { [key: string]: Comment };
    comments.forEach((comment) => {
      console.log(comment.id, comment);
      commentsObject[String(comment.id)] = comment;
    });
    return commentsObject;
  }
}

export interface Comment {
  id: string;
  ok_to_display: boolean;
  date_entered: string;
  commenter_name: string;
  comment_text: string;
  parent_comment: string | null;
  replies: string[];
}
