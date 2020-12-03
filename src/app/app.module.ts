import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { httpInterceptorProviders } from './http-interceptors';
import { SessionCounterPipe } from './session-counter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SessionCounterPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
    CoursesModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
