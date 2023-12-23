import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = 'http://localhost:8000/';
  url!: string;
  constructor(
    @Inject(String) relativeRoute: string,
    private http: HttpClient
  ) {
    this.url = this.baseURL + relativeRoute;
  }

  getAll(headers?: HttpHeaders): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http.get(this.url, options).pipe(catchError(this.handleError));
  }

  create(resource: Object): Observable<Object> {
    return this.http
      .post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  update(resourceId: number, fields: Object) {
    return this.http.patch(this.url + '/' + resourceId, JSON.stringify(fields));
  }

  delete(id: number): Observable<Object> {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 400) {
      return throwError(() => new BadInputError(error));
    }

    if (error.status === 404) {
      return throwError(() => new NotFoundError(error));
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new AppError(error));
  }
}
