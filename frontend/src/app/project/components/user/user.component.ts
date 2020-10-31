import { Component, OnInit, Input } from '@angular/core';
import { User } from '@nevilparmar11/interface/user';

@Component({
  selector: 'j-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {}
}