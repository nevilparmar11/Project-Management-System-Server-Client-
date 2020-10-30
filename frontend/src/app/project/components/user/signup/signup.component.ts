import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@nevilparmar11/project/auth/auth.service';
import { ProjectService } from '../../../state/project/project.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerUserData = {
    email : '#',
    password : '#'
  }
  constructor(
    private _projectService : ProjectService,
    private _auth: AuthService,
    private _router: Router) {
      this._projectService.setLoading(false);
    }

  ngOnInit() {
    // nothing to do here
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/project/board'])
      },
      err => console.log(err)
    )      
  }

}
