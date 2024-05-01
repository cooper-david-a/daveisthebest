import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export class MockActivatedRoute extends ActivatedRoute {
  private paramsSubject = new BehaviorSubject<Params>({});

  override params: Observable<Params> = this.paramsSubject.asObservable();

  constructor(initialParams?: Params) {
    super();
    if (initialParams) {
      this.paramsSubject.next(initialParams);
    }
  }

  setParams(params: Params): void {
    this.paramsSubject.next(params);
  }
}

export class MockAuthService {
  currentUser = { username: '' };
}

export class MockCommentsService {
  
}
