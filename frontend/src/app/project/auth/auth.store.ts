import { Injectable } from '@angular/core';
import { User } from '@nevilparmar11/interface/user';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState extends User {
  token: string;
}

export function createInitialAuthState(): AuthState {
  return { token: `${new Date().getTime()}` } as AuthState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialAuthState());
  }
}
