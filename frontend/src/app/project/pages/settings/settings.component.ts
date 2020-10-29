import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@nevilparmar11/project/config/const';
import { Project, ProjectCategory } from '@nevilparmar11/interface/project';
import { ProjectQuery } from '@nevilparmar11/project/state/project/project.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@nevilparmar11/project/state/project/project.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NoWhitespaceValidator } from '@nevilparmar11/core/validators/no-whitespace.validator';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService,
    private _notification: NzNotificationService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: Project) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category
    });
  }

  submitForm() {
    const formValue: Partial<Project> = this.projectForm.getRawValue();
    this._projectService.updateProject(formValue);
    this._notification.create(
      'success',
      'Changes have been saved successfully.',
      ''
    );
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
