import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService, PostComment } from '../comment.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'comment-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  commentService = inject(CommentService);
  authService = inject(AuthService);
  parentCommentId = input<number | null>(null);
  form = new FormGroup({
    commentText: new FormControl('', { validators: [Validators.required] }),
  });

  postComment() {
    if (this.authService.isLoggedIn) {
      let comment: PostComment = {
        commentText: this.form.value.commentText
          ? this.form.value.commentText
          : '',
        parentComment: this.parentCommentId(),
      };

      this.commentService.postComment(comment).subscribe();

      this.commentService.expandedReplies.add(this.parentCommentId() ?? 0);

      this.form.reset();
    }
  }
}
