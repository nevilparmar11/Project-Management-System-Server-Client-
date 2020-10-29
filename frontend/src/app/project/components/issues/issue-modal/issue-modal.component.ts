import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '@nevilparmar11/interface/issue';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@nevilparmar11/interface/ui-model/delete-issue-model';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent implements OnInit {
  @Input() issue$: Observable<Issue>;

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
