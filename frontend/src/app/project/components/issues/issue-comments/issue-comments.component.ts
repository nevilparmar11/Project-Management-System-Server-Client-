import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '@nevilparmar11/interface/issue';

@Component({
  selector: 'issue-comments',
  templateUrl: './issue-comments.component.html',
  styleUrls: ['./issue-comments.component.scss']
})
export class IssueCommentsComponent implements OnInit {
  @Input() issue: Issue;

  constructor() {}

  ngOnInit(): void {}
}
