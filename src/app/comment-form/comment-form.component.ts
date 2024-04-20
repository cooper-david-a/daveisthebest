import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class CommentFormComponent {
  form = new FormGroup({
    commentText: new FormControl('', { validators: [Validators.required] }),
  });

  commentsService = inject(CommentsService);

  @Input() parentCommentId!: number;
  @Input() closable = false;
  @Output() close = new EventEmitter();

  handleCloseForm() {
    this.close.emit();
  }

  postComment() {
    let commentText = this.form.value.commentText ?? '';
    return this.commentsService.postComment(
      commentText,
      this.parentCommentId ?? null
    );
  }
}
