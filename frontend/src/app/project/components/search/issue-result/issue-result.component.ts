import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '@nevilparmar11/interface/issue';
import { IssueUtil } from '@nevilparmar11/project/utils/issue';

@Component({
  selector: 'issue-result',
  templateUrl: './issue-result.component.html',
  styleUrls: ['./issue-result.component.scss']
})
export class IssueResultComponent implements OnInit {
  @Input() issue: Issue;

  get issueTypeIcon() {
    return IssueUtil.getIssueTypeIcon(this.issue?.type);
  }

  constructor() {}

  ngOnInit(): void {}
}
