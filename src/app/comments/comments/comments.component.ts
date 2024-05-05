import { Component, inject } from '@angular/core';
import { CommentService } from '../comment.service';
import { AsyncPipe } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  imports: [
    AsyncPipe,
    CommentComponent,
    CommentFormComponent,
  ],
})
export class CommentsComponent {
  commentService = inject(CommentService);
}
