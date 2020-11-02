import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { Query } from '@datorama/akita';
import {AccountService} from '@nevilparmar11/_services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore, private _auth : AccountService) {
    super(store);
  }

  user$ = this.select();
  userId$ = this.select('_id');

  // user$ = this.select(this._auth.userValue);
  // userId$ = this._auth.userValue._id;
}
