import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectConst } from '@nevilparmar11/project/config/const';
import { ProjectQuery } from '@nevilparmar11/project/state/project/project.query';
import { Project } from '@nevilparmar11/interface/project';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Issue } from '@nevilparmar11/interface/issue';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { DeleteIssueModel } from '@nevilparmar11/interface/ui-model/delete-issue-model';

@Component({
  selector: 'full-issue-detail',
  templateUrl: './full-issue-detail.component.html',
  styleUrls: ['./full-issue-detail.component.scss']
})
@UntilDestroy()
export class FullIssueDetailComponent implements OnInit {
  project: Project;
  issueById$: Observable<Issue>;
  issueId: string;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Issues', this.issueId];
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getIssue();
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  private getIssue() {
    this.issueId = this._route.snapshot.paramMap.get(ProjectConst.IssueId);
    if (!this.issueId) {
      this.backHome();
      return;
    }
    this.issueById$ = this._projectQuery.issueById$(this.issueId);
  }

  deleteIssue({issueId, deleteModalRef}: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.backHome();
  }

  private backHome() {
    this._router.navigate(['/']);
  }
}
