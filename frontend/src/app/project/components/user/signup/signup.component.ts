import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../state/project/project.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private _projectService : ProjectService
  ) { 
    this._projectService.setLoading(false);
  }

  ngOnInit(): void {
  }

}
