import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Issue } from '@nevilparmar11/interface/issue';
import { User } from '@nevilparmar11/interface/user';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';

@Component({
  selector: 'issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
  @Input() issue: Issue;
  @Input() users: User[];
  assignees: User[];

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
  }

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.assignees = this.issue.userIds.map((userId) => this.users.find((x) => x.id === userId));
    }
  }

  removeUser(userId: string) {
    const newUserIds = this.issue.userIds.filter((x) => x !== userId);
    this._projectService.updateIssue({
      ...this.issue,
      userIds: newUserIds
    });
  }

  addUserToIssue(user: User) {
    this._projectService.updateIssue({
      ...this.issue,
      userIds: [...this.issue.userIds, user.id]
    });
  }

  isUserSelected(user: User): boolean {
    return this.issue.userIds.includes(user.id);
  }
}
