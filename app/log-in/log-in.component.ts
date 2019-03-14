import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../UserLogin';
import { RestAppService } from '../rest-app-service.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  ngOnInit() {}
}

  