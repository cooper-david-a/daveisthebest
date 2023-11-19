import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Comment } from '../comment/comment.component';

import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments!: Comments;
  threads: number[] = [];

  pageSizeOptions = [5, 10, 25, 50];
  pageSize = 5;
  pageIndex = 0;


  constructor(private service: CommentsService) {}

  ngOnInit(): void {
    this.service.getComments().subscribe((comments) => {
      this.configureComments(comments);
    });
  }

  private configureComments(comments: Comment[]) {
    let commentsObject: Comments = {};
    comments.forEach((comment) => {
      Object.assign(commentsObject, { [comment.id]: comment });

      if (!comment.parent_comment) this.threads.push(comment.id);
    });

    this.comments = commentsObject;

  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(e);
  }
}

export interface Comments {
  [id: number]: Comment;
}
