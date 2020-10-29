import { Component, Input, OnInit } from '@angular/core';
import { IssueStatus, IssueStatusDisplay, Issue } from '@nevilparmar11/interface/issue';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { ProjectQuery } from '@nevilparmar11/project/state/project/project.query';

@Component({
  selector: 'issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {
  @Input() issue: Issue;
  IssueStatusDisplay = IssueStatusDisplay;

  variants = {
    [IssueStatus.BACKLOG]: 'btn-secondary',
    [IssueStatus.SELECTED]: 'btn-secondary',
    [IssueStatus.IN_PROGRESS]: 'btn-primary',
    [IssueStatus.DONE]: 'btn-success'
  };

  issueStatuses: IssueStatusValueTitle[];

  constructor(private _projectService: ProjectService, private _projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.issueStatuses = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE)
    ];
  }

  updateIssue(status: IssueStatus) {
    const newPosition = this._projectQuery.lastIssuePosition(status);
    this._projectService.updateIssue({
      ...this.issue,
      status,
      listPosition: newPosition + 1
    });
  }

  isStatusSelected(status: IssueStatus) {
    return this.issue.status === status;
  }
}

class IssueStatusValueTitle {
  value: IssueStatus;
  label: string;
  constructor(issueStatus: IssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
