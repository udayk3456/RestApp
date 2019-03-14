import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class User {
    id:number;
    firstName: String;
    lastName: String;
    dob: Date;
    email: String;
    number: number;
    //userId: any;
    userEmail:String;
}
