import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { HomeDashboardComponent } from './home-dashboard.component';
import { ActivatedRoute} from '@angular/router';
import { MockActivatedRoute } from 'src/testing/mockResources';

describe('HomeDashboardComponent', () => {
  let component: HomeDashboardComponent;
  let fixture: ComponentFixture<HomeDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({providers:[{provide: ActivatedRoute, useClass: MockActivatedRoute}],
    imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        HomeDashboardComponent,
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    const mockActivatedRoute = TestBed.inject(MockActivatedRoute);
    mockActivatedRoute.setParams({});
    expect(component).toBeTruthy();
  });
});
