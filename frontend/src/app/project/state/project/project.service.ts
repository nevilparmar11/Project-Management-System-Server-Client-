import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayRemove, arrayUpsert, setLoading } from '@datorama/akita';
import { Comment } from '@nevilparmar11/interface/comment';
import { Issue } from '@nevilparmar11/interface/issue';
import { Project } from '@nevilparmar11/interface/project';
import { DateUtil } from '@nevilparmar11/project/utils/date';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private _http: HttpClient, private _store: ProjectStore) {
    this.baseUrl = environment.apiUrl;
  }

  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }

  getProject() {
    this._http
      .get<Project>(`${this.baseUrl}/project-api/project/5f9b109e856c60c2c2d349a6`)
      .pipe(
        setLoading(this._store),
        tap((project) => {
          this._store.update((state) => {
            return {
              ...state,
              ...project
            };
          });
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      )
      .subscribe();

  console.log("fetching project for the first time from the mongodb");
  console.log(this._store);
  }

  updateProject(project: Partial<Project>) {

    this._http
    .post<Project>(`${this.baseUrl}/project-api/project/update/${project._id}`, project)
    .pipe(
      setLoading(this._store),
      tap((project) => {
        this._store.update((state) => {
          return {
            ...state,
            ...project
          };
        });

        this.getProject();
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    )
    .subscribe();

  }

  updateIssue(issue: Issue) {
    issue.updatedAt = DateUtil.getNow();
    this._http
    .post<Issue>(`${this.baseUrl}/issue-api/issue/update/${issue._id}`, issue)
    .pipe(
      setLoading(this._store),
      tap((issue) => {
        this._store.update((state) => {
          const issues = arrayUpsert(state.issues, issue._id, issue);
          return {
            ...state,
            issues
          };
        });
        this.getProject();
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    )
    .subscribe();

    console.log(this._store);
  }
  createIssue(issue: Issue) {
    issue.updatedAt = DateUtil.getNow();
    this._http
    .post<Issue>(`${this.baseUrl}/issue-api/issue/create/5f9b109e856c60c2c2d349a6`, issue)
    .pipe(
      setLoading(this._store),
      tap((issue) => {
        this._store.update((state) => {
          const issues = arrayUpsert(state.issues, issue._id, issue);
          return {
            ...state,
            issues
          };
        });
        this.getProject();
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    )
    .subscribe();

    console.log(this._store);
  }


  deleteIssue(issueId: string) {
    
    this._http
    .post<Issue>(`${this.baseUrl}/issue-api/issue/delete/5f9b109e856c60c2c2d349a6/${issueId}`,{})
    .pipe(
      setLoading(this._store),
      tap((issue) => {
        this._store.update((state) => {
          const issues = arrayRemove(state.issues, issueId);
          return {
            ...state,
            issues
          };
        });
        this.getProject();
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    )
    .subscribe();

  }

  updateIssueComment(issueId: string, comment: Comment) {
    const allIssues = this._store.getValue().issues;
    const issue = allIssues.find((x) => x._id === issueId);
    if (!issue) {
      return;
    }

  

    this._http
    .post<Comment>(`${this.baseUrl}/comment-api/comment/create/${issueId}`,{})
    .pipe(
      setLoading(this._store),
      tap((comment) => {
        this._store.update((state) => {
          const comments = arrayUpsert(issue.comments ?? [], comment._id, comment);
          this.updateIssue({
            ...issue,
            comments
          });
        });
        this.getProject();
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    )
    .subscribe();
  }
}
