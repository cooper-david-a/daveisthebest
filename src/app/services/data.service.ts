import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-found-error';
import { BadInputError } from '../common/errors/bad-input-error';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = environment.apiUrl;
  url!: string;

  constructor(
    @Inject(RELATIVE_ROUTE) relativeRoute: string,
    private http: HttpClient
  ) {
    this.url = this.baseURL + relativeRoute;
  }

  getAll(headers?: HttpHeaders): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http.get(this.url, options).pipe(catchError(this.handleError));
  }

  get(resourceId: number | string, headers?: HttpHeaders): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http
      .get(this.url + resourceId, options)
      .pipe(catchError(this.handleError));
  }

  create(resource: Object, headers?: HttpHeaders): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http
      .post(this.url, resource, options)
      .pipe(catchError(this.handleError));
  }

  update(
    resourceId: number | string,
    fields: Object,
    headers?: HttpHeaders
  ): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http.patch(
      this.url + resourceId + '/',
      fields,
      options
    );
  }

  delete(id: number | string, headers?: HttpHeaders): Observable<Object> {
    let options = headers ? { headers: headers } : {};
    return this.http
      .delete(this.url + id, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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

export const RELATIVE_ROUTE = new InjectionToken<string>('relativeRoute');
