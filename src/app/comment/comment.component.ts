import { Component, Input } from '@angular/core';

import { Comments } from '../comments/comments.component';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

    @Input() commentObject!: Comment;
    @Input() comments!: Comments;

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
