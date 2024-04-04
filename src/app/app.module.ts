import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { StopwatchPipe } from './pipes/stopwatch.pipe';

import { AppMaterialModule } from './app-material.module';
import { HiitTimerComponent } from './pages/hiit-timer/hiit-timer.component';
import { HiitTimerOpenDialogComponent } from './pages/hiit-timer/hiit-timer-open-dialog/hiit-timer-open-dialog.component';
import { ThermodynamicPropertyCalculatorComponent } from './pages/thermodynamic-property-calculator/thermodynamic-property-calculator.component';
import { HiitTimerService } from './pages/hiit-timer/hiit-timer.service';
import { AuthService } from './services/auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppMaterialModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HomeComponent,
        CommentsComponent,
        CommentComponent,
        TimeSincePipe,
        HomeDashboardComponent,
        CommentFormComponent,
        HiitTimerComponent,
        HiitTimerOpenDialogComponent,
        ThermodynamicPropertyCalculatorComponent,
        StopwatchPipe,
        LoginFormComponent,
    ],
    providers: [
        DataService,
        CommentsService,
        HiitTimerService,
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: ErrorHandler, useClass: AppErrorHandler },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
