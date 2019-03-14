import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestAppService } from '../rest-app-service.service';
import { User } from '../User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/util';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { UserIdleService } from 'angular-user-idle';



@Component({
  selector: 'app-rest-test',
  templateUrl: './rest-test.component.html',
  styleUrls: ['./rest-test.component.css']
})
export class RestTestComponent implements OnInit {
  response: any;
  user: User = new User();
  firstNameError: String = null;
  lastNameError: String;
  dobError: String;
  emailError: String;
  numberError: String;
  responseText: Boolean = true;
  constructor(private router: Router, private service: RestAppService, private oauthService: OAuthService,private userIdle: UserIdleService) {
  }
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    this.user.userEmail = claims['email'];
    return claims['name'];
  }
  ngOnInit() {
  }
  createUser(): void {

    if (this.user.firstName == '' || this.user.firstName == null) {
      this.firstNameError = "firstname is required";
      return;
    }
    else {
      this.firstNameError = null;
      if (this.user.lastName == '' || this.user.lastName == null) {
        this.lastNameError = "lastname is required";
        return;
      } else {
        this.lastNameError = null;
        if (this.user.dob == null) {
          this.dobError = "date of birth is required";
          return;
        } else {
          this.dobError = null;
          if (this.user.email == null || this.user.email == '') {
            this.emailError = "email is required";
            return;
          } else {
            this.emailError = null;
            if (this.user.number == null || this.user.number == 0) {
              this.numberError = "phone number is required";
              return;
            } else {
              this.numberError = null;
              this.service.createUser(this.user).subscribe(data => {
                //this.response=JSON.stringify(data);
                console.log(this.user);
                this.response = data;
                if (this.response == null) {
                  this.responseText = false;
                }
                console.log(data);
                //this.myform.reset();
              });
              this.user = new User();
            }
          }
        }
      }
    }

  }

  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }
  steps(){
    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!')
      this.oauthService.logOut();
      this.router.navigateByUrl("/");
    }
    );
  }
}