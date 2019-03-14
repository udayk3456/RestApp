import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { stringify } from 'querystring';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from "./User";
import { AppComponent } from './app.component';
import { UserLogin } from './UserLogin';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 'Accept': 'application/json',
  })
  
}
@Injectable()
export class RestAppService {

  constructor(private http: HttpClient) { }
  private url = "https://webtestapplication.cfapps.io/";
  public getUserId(email) {
    return this.http.get<any>(this.url + "uday/user/getId"+email,httpOptions);
  }
  public loginUser(userLogin) {
    return this.http.post<UserLogin>(this.url + "uday/user/login", userLogin, httpOptions);
  }
  public createUser(user) {
    return this.http.post<User>(this.url + "uday/save", user, httpOptions);
  }
  public getUsers(user:String) {
    return this.http.get<User[]>(this.url + "uday/getAll/"+user, httpOptions);
  }
  public deleteUser(user) {
    return this.http.delete(this.url + "uday/delete/" + user.id, httpOptions);
  }
  public updateUser(user) {
    return this.http.put<User>(this.url + "uday/update", user, httpOptions);
  }
}
