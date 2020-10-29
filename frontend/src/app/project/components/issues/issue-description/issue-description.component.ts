import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Issue } from '@nevilparmar11/interface/issue';
import { FormControl } from '@angular/forms';
import { quillConfiguration } from '@nevilparmar11/project/config/editor';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';

@Component({
  selector: 'issue-description',
  templateUrl: './issue-description.component.html',
  styleUrls: ['./issue-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueDescriptionComponent implements OnChanges {
  @Input() issue: Issue;
  descriptionControl: FormControl;
  editorOptions = quillConfiguration;
  isEditing: boolean;
  isWorking: boolean;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.descriptionControl = new FormControl(this.issue.description);
    }
  }

  setEditMode(mode: boolean) {
    this.isEditing = mode;
  }

  editorCreated(editor: any) {
    editor.focus && editor.focus();
  }

  save() {
    this._projectService.updateIssue({
      ...this.issue,
      description: this.descriptionControl.value
    });
    this.setEditMode(false);
  }

  cancel() {
    this.descriptionControl.patchValue(this.issue.description);
    this.setEditMode(false);
  }

  ngOnInit(): void {}
}
