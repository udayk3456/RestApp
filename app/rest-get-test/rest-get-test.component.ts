import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestAppService } from '../rest-app-service.service';
import { User } from '../User';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-rest-get-test',
  templateUrl: './rest-get-test.component.html',
  styleUrls: ['./rest-get-test.component.css']
})
export class RestGetTestComponent implements OnInit {
  //userEmail:String;
  click:boolean=false;
  users: User[];
  user: User;
  response: any;
  firstNameError: String;
  lastNameError: String;
  dobError: String;
  emailError: String;
  numberError: String;
  constructor(private router: Router, private service: RestAppService, private oauthService: OAuthService) { }
  /*get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    else {
      this.user.userEmail = claims['email'];
      return claims['name'];
    }
  }*/
  ngOnInit() {
    const claims = this.oauthService.getIdentityClaims();
    this.service.getUsers(claims['email']).subscribe(data => {
      this.users = data;
    })
  }
  deleteUser(user: User) {
    this.service.deleteUser(user).subscribe(data => {
      this.users = this.users.filter(u => {
        u !== user;
        location.reload();
      });
    });
  }
  editUser(user: User) {
    this.click=true;
    this.user = user;
    return user;
  }
  editUsers(): void {
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
              this.service.updateUser(this.user).subscribe(data => {
                this.response = data;
              }
              );
            }
          }
        }
      }
    }
    this.click=false;
  }
}
