import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../state/project/project.service';
import {Router} from '@angular/router';
import { AuthService } from '@nevilparmar11/project/auth/auth.service';
import { AuthStore } from '@nevilparmar11/project/auth/auth.store';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email : 'nevilparmar24@gmail.com',
    password : 'nevil'
  };

  constructor(
    private _projectService : ProjectService,
    private _auth: AuthService,
    private _store : AuthStore,
    private _router: Router
  ) { 
    this._projectService.setLoading(false);
  }

  ngOnInit(): void {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._store.update((state) => ({
          ...res.state,
          ...res.user
        }));
        this._router.navigate(['/project/board'])
      },
      err => console.log(err)
    ) 
  }
}
