import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'p-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type = 'button';
  @Input() className = 'btn-primary';
  @Input() icon: string;
  @Input() iconSize = 18;
  @Input() isWorking: boolean;
  @Input() isActive: boolean;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit(): void {}

}
