import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserIdleModule } from 'angular-user-idle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestTestComponent } from './rest-test/rest-test.component';
import { RestAppService } from './rest-app-service.service';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { RestGetTestComponent } from './rest-get-test/rest-get-test.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserLogin } from './UserLogin';

@NgModule({
  declarations: [
    AppComponent,
    RestTestComponent,
    RestGetTestComponent,
    LogOutComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    UserIdleModule.forRoot({idle: 60, timeout: 60, ping: 120})
  ],
  providers: [RestAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
