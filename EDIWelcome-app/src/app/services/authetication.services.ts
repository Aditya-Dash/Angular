import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ok } from 'assert';
import { Observable,  of ,throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private user:User
    constructor() {
       
    }
    login(username: string, password: string){
        
        if(username === "admin" && password === "Welcome@01")
            
            return of({
                id: 1,
                username: username,
                name: 'Administrator'
            });
        else
            return this.error('Username or password is incorrect');
    };

    error(message): any {
        return throwError({ error: { message } });
    }

    getLoggedInUser(): any {
        return of({
                id: 1,
                username: 'admin',
                name: 'Administrator',
                password: ""
        });
    }

}