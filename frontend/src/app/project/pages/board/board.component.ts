import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '@nevilparmar11/core/services/google-analytics.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  breadcrumbs: string[] = ['Projects', 'Project Management System', 'Dashboard'];

  constructor(private _googleAnalytics: GoogleAnalyticsService) {}

  ngOnInit(): void {}

  sendTwitterEventButton() {
    this._googleAnalytics.sendEvent('Share Twitter', 'button');
  }
}
