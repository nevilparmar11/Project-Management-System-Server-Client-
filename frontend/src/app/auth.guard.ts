import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './project/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('user is logged in')
      return true
    } else {
      console.log('user is not logged in')            
      this._router.navigate(['/login'])
      return false
    }
  }
}
