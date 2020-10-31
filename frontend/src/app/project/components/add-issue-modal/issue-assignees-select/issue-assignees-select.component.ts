import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { User } from '@nevilparmar11/interface/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'issue-assignees-select',
  templateUrl: './issue-assignees-select.component.html',
  styleUrls: ['./issue-assignees-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueAssigneesSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() users: User[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  getUser(userId: string) {
    return this.users.find((user) => user._id === userId);
  }
}
