import { Component, Injectable, OnInit } from '@angular/core';

import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { Comment } from '../comment/comment.component';

import { CommentsService } from '../services/comments.service';

@Injectable()
export class CommentsPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = `Threads per page:`;
}

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: CommentsPaginator }],
})

export class CommentsComponent implements OnInit {
  comments!: Comments;
  threads: number[] = [];

  pageSizeOptions = [5, 10, 25, 50];
  pageSize = 5;
  pageIndex = 0;
  pageContent: number[] = [];


  constructor(
    private service: CommentsService,
  ) {}

  ngOnInit(): void {

    this.service.getComments().subscribe((comments) => {
      this.configureComments(comments);
      let [first, last] = this.getPage();
      this.pageContent = this.threads.slice(first, last);
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
    let [first, last] = this.getPage();
    this.pageContent = this.threads.slice(first, last);
  }

  getPage(): [number, number] {
    let first = this.pageIndex * this.pageSize;
    let last = first + this.pageSize;
    return [first, last];
  }
}

export interface Comments {
  [id: number]: Comment;
}
