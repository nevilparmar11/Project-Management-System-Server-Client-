import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Issue, IssuePriority } from '@nevilparmar11/interface/issue';
import { IssuePriorityIcon } from '@nevilparmar11/interface/issue-priority-icon';
import { IssueUtil } from '@nevilparmar11/project/utils/issue';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { ProjectConst } from '@nevilparmar11/project/config/const';

@Component({
  selector: 'issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnInit, OnChanges {
  selectedPriority: IssuePriority;

  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities: IssuePriorityIcon[];

  @Input() issue: Issue;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue?.priority;
  }

  isPrioritySelected(priority: IssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: IssuePriority) {
    this.selectedPriority = priority;
    this._projectService.updateIssue({
      ...this.issue,
      priority: this.selectedPriority
    });
  }
}
