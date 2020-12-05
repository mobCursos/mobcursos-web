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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SessionCounterPipe,
    HomeComponent,
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
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: BUCKET, useValue: environment.firebase.storageBucket }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
