import { Component, Injectable, OnInit } from '@angular/core';

import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { CommentsService } from '../services/comments.service';

@Injectable()
export class CommentsPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = `Threads per page:`;
}

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CommentsPaginator }],
})
export class CommentsComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 50];
  pageSize = this.pageSizeOptions[0];
  pageIndex = 0;
  pageContent: number[] = [];

  constructor(public service: CommentsService) {}

  ngOnInit(): void {
    this.service.getComments().subscribe(()=>this.getPage());
  }

  getPage(e?: PageEvent) {
    if (e){
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
    }
    let [first, last] = this.getPageIndices();
    this.pageContent = this.service.threads.slice(first, last);
  }

  private getPageIndices(): [number, number] {
    let first = this.pageIndex * this.pageSize;
    let last = first + this.pageSize;
    return [first, last];
  }
}


