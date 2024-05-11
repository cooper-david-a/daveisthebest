import { Component, OnInit, inject, input } from '@angular/core';
import { Comment, CommentService } from '../comment.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { TimeSincePipe } from '../../pipes/time-since.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleExpansionButtonComponent } from '../../common/toggle-expansion-button/toggle-expansion-button.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  imports: [
    CommentFormComponent,
    TimeSincePipe,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ToggleExpansionButtonComponent,
  ],
})
export class CommentComponent implements OnInit {
  authService = inject(AuthService);
  commentService = inject(CommentService);
  commentInput = input.required<Comment>();
  formHidden = true;
  repliesHidden = true;

  ngOnInit(): void {
    this.repliesHidden = !this.commentService.expandedReplies.has(
      this.commentInput().id
    );
  }

  toggleHideForm() {
    this.formHidden = !this.formHidden;
  }

  toggleRepliesHidden() {
    this.repliesHidden = !this.repliesHidden;
    if (this.repliesHidden) {
      this.commentService.expandedReplies.delete(this.commentInput().id);
    } else {
      this.commentService.expandedReplies.add(this.commentInput().id);
    }
  }
}
