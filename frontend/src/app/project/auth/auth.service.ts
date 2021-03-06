import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@nevilparmar11/interface/user';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthStore } from './auth.store';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private _http: HttpClient, private _store: AuthStore, private _router : Router) {
    this.baseUrl = environment.apiUrl + "/user-api"; // set the value as per the production variable (Ex. Production / Developement)
  }

  login({ email = '', password = '' }: LoginPayload) {
    this._store.setLoading(true);
    console.log(email,password);
    this._http
      .get<User>(`/assets/data/auth.json`)
      .pipe(
        map((user) => {
          this._store.update((state) => ({
            ...state,
            ...user
          }));
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
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


  registerUser(user) {
    return this._http.post<any>(`${this.baseUrl}/register`, user)
  }

  loginUser(user) {
    return this._http.post<any>(`${this.baseUrl}/login`, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['../login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

}

export class LoginPayload {
  email: string;
  password: string;
  constructor() {
    // this.email = 'trungk18@gmail.com';
    this.password = `${new Date().getTime()}`;
    this.email = "nevilparmar24@gmail.com";
    // this.password = "nevil"
  }
}
