import { Component, Input } from '@angular/core';
import { CommentsService, Comment } from '../services/comments.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() commentObject!: Comment;
  repliesHidden = true;
  replyFormShown = false;

  constructor(public service: CommentsService){}

  showReplies() {
    this.repliesHidden = !this.repliesHidden;
  }

  showReplyForm() {
    this.replyFormShown = true;
  }

  closeReplyForm() {
    this.replyFormShown = false;
  }
}
