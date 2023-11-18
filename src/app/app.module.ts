import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentsComponent } from './comments/comments.component';
import { DataService } from './services/data.service';
import { AppErrorHandler } from './common/app-error-handler';
import { CommentsService } from './services/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    HomeComponent,
    CommentsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule],
  providers: [
    DataService,
    CommentsService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
