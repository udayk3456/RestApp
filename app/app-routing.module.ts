import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestTestComponent } from './rest-test/rest-test.component';
import { RestGetTestComponent } from './rest-get-test/rest-get-test.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {path: 'login',component: LogInComponent},
  {path: 'add',component: RestTestComponent,canActivate: [AuthGuardService]},
  {path:'getAll',component:RestGetTestComponent,canActivate: [AuthGuardService]},
  {path: 'logOut',component:LogOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
