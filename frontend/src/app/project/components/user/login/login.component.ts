import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../state/project/project.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _projectService : ProjectService
  ) { 
    this._projectService.setLoading(false);
  }

  ngOnInit(): void {
  }

}
