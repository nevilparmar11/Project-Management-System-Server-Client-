import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '@nevilparmar11/core/services/google-analytics.service';
import {AccountService} from '@nevilparmar11/_services/account.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumbs: string[] = ['Projects', 'Project Management System', 'Dashboard'];

  constructor(private _googleAnalytics: GoogleAnalyticsService, private accountService : AccountService) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }

  sendTwitterEventButton() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
