import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueType, Issue, IssueStatus, IssuePriority } from '@nevilparmar11/interface/issue';
import { quillConfiguration } from '@nevilparmar11/project/config/editor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { IssueUtil } from '@nevilparmar11/project/utils/issue';
import { ProjectQuery } from '@nevilparmar11/project/state/project/project.query';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { User } from '@nevilparmar11/interface/user';
import { tap } from 'rxjs/operators';
import { NoWhitespaceValidator } from '@nevilparmar11/core/validators/no-whitespace.validator';
import { DateUtil } from '@nevilparmar11/project/utils/date';

@Component({
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.scss']
})
@UntilDestroy()
export class AddIssueModalComponent implements OnInit {
  reporterUsers$: Observable<User[]>;
  assignees$: Observable<User[]>;
  issueForm: FormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService,
    private _projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    this.initForm();
    this.reporterUsers$ = this._projectQuery.users$.pipe(
      untilDestroyed(this),
      tap((users) => {
        const [user] = users;
        if (user) {
          this.f.reporterId.patchValue(user._id);
        }
      })
    );

    this.assignees$ = this._projectQuery.users$;
  }

  initForm() {
    this.issueForm = this._fb.group({
      type: [IssueType.TASK],
      priority: [IssuePriority.MEDIUM],
      title: ['', NoWhitespaceValidator()],
      description: [''],
      reporterId: [''],
      userIds: [[]]
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    const now = DateUtil.getNow();
    const issue: Issue = {
      ...this.issueForm.getRawValue(),
      status: IssueStatus.BACKLOG,
      createdAt: now,
      updatedAt: now
    };

    this._projectService.createIssue(issue);
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._modalRef.close();
  }
}
