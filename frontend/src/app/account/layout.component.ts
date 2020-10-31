import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@nevilparmar11/project/auth/auth.store';

import { AccountService } from '../_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private _store : AuthStore,
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            const user = this.accountService.userValue;
            this._store.update((state) => ({
                ...state,
                ...user
              }));
            console.log(user);
            this.router.navigate(['../project/board']);
        } else {
            this.router.navigate(['../account/login']);
        }
    }
}