import { ErrorHandler, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DataService } from './services/data.service';
import { AppErrorHandler } from './common/app-error-handler';
import { CommentsService } from './services/comments.service';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { TimeSincePipe } from './pipes/time-since.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDashboardComponent } from './pages/home/home-dashboard/home-dashboard.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

import { AppMaterialModule } from './app-material.module';
import { HiitTimerComponent } from './pages/hiit-timer/hiit-timer.component';
import { ThermodynamicPropertyCalculatorComponent } from './pages/thermodynamic-property-calculator/thermodynamic-property-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentsComponent,
    CommentComponent,
    TimeSincePipe,
    HomeDashboardComponent,
    CommentFormComponent,
    HiitTimerComponent,
    ThermodynamicPropertyCalculatorComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    DataService,
    CommentsService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
