import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() parentCommentId!: number;
  @Input() closable = false;
  @Output() close = new EventEmitter();

  handleCloseForm() {
    this.close.emit();
  }

  onSubmit(f: NgForm) {
    console.log(f);
  }
}
