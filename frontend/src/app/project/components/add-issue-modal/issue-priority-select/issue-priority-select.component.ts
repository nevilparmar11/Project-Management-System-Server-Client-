import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IssuePriorityIcon } from '@nevilparmar11/interface/issue-priority-icon';
import { IssueUtil } from '@nevilparmar11/project/utils/issue';
import { IssuePriority } from '@nevilparmar11/interface/issue';
import { ProjectConst } from '@nevilparmar11/project/config/const';

@Component({
  selector: 'issue-priority-select',
  templateUrl: './issue-priority-select.component.html',
  styleUrls: ['./issue-priority-select.component.scss']
})
export class IssuePrioritySelectComponent implements OnInit {
  @Input() control: FormControl;
  priorities: IssuePriorityIcon[];

  constructor() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  getPriorityIcon(priority: IssuePriority) {
    return IssueUtil.getIssuePriorityIcon(priority);
  }

  ngOnInit(): void {}
}
