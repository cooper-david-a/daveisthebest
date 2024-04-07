import { Component, Input } from '@angular/core';
import { CommentsService, Comment } from '../services/comments.service';
import { TimeSincePipe } from '../pipes/time-since.pipe';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    standalone: true,
    imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommentFormComponent,
    TimeSincePipe
],
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
