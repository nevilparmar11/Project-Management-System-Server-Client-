import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , of} from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interface/user';


// local stores to manage the state of the application
import { AuthStore } from '../project/auth/auth.store';
import {AuthService} from '@nevilparmar11/project/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private _store : AuthStore,
        private _authService : AuthService,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        // this._authService.login({email,password});
        return this.http.post<User>(`${environment.apiUrl}/user-api/login`, { email, password })
            .pipe(map((user) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this._store.update((state) => ({
                    ...state,
                    ...user
                  }));
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
        
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/user-api/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/user-api/all`);
    }

    getById(id: string) {
        // return this.http.get<User>(`${environment.apiUrl}/user-api/${id}`);
    console.log("get by id user")
     return this.http
      .get<User>(`${environment.apiUrl}/user-api/${id}`)
      .pipe(
        map((user) => {
          this._store.update((state) => ({
            ...state,
            ...user
          }));
        }),
        finalize(() => {
          this._store.setLoading(false);
        }),
        catchError((err) => {
          this._store.setError(err);
          return of(err);
        })
      )
      .subscribe();
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue._id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/user-api/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue._id) {
                    this.logout();
                }
                return x;
            }));
    }
}