import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { getParamsObjectFromHash } from './getParamsObjectFromHash';
import { RestAppService } from './rest-app-service.service';
import { UserLogin } from './UserLogin';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
  userLogin: UserLogin = new UserLogin();
  register: boolean = false;
  constructor(private oauthService: OAuthService, private rest: RestAppService, private router: Router) {
    this.ConfigureImplicitFlowAuthentication();
  }
  authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: 'https://udaywebtestapplication.cfapps.io/',
    clientId: '743322070516-98dreoglgv5u75logaa19m01ura260f3.apps.googleusercontent.com',
    dummyClientSecret: '0sGCtGlP77O2oeQbeaLW6q0G',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
  };
  private ConfigureImplicitFlowAuthentication() {

    this.oauthService.configure(this.authConfig);

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
          const details = this.oauthService.getIdentityClaims();
          if (details) {
            this.userLogin.email = details['email'];
            this.userLogin.familyName = details['family_name'];
            this.userLogin.givenName = details['given_name'];
            this.userLogin.userName = details['name'];
            this.userLogin.picture = details['picture'];
            this.userLogin.emailVerified = details['email_verified'];
            this.registerUser();
          }

        }
      })
        .catch(err => {
          console.error(err);
        })
    });
  }
  get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    else {
      this.userLogin.email = claims['email'];
      this.userLogin.familyName = claims['family_name'];
      this.userLogin.givenName = claims['given_name'];
      this.userLogin.userName = claims['name'];
      this.userLogin.picture = claims['picture'];
      this.userLogin.emailVerified = claims['email_verified'];
      return claims['name'];
    }
  }
  registerUser() {
    if (this.register == false) {
      this.rest.loginUser(this.userLogin).subscribe(data => {
        this.register = true;
      })
    }
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigateByUrl("/");
  }
  login() {
    this.oauthService.initImplicitFlow();
  }
  title = 'rest-app';
}
