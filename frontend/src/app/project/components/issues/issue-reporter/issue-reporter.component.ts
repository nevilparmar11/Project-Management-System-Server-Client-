import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Issue } from '@nevilparmar11/interface/issue';
import { User } from '@nevilparmar11/interface/user';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';

@Component({
  selector: 'issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
@UntilDestroy()
export class IssueReporterComponent implements OnInit, OnChanges {
  @Input() issue: Issue;
  @Input() users: User[];
  reporter: User;

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.reporter = this.users.find((x) => x.id === this.issue.reporterId);
    }
  }

  isUserSelected(user: User) {
    return user.id === this.issue.reporterId;
  }

  updateIssue(user: User) {
    this._projectService.updateIssue({
      ...this.issue,
      reporterId: user.id
    });
  }
}
