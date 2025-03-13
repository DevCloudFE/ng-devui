import { Component, OnInit } from '@angular/core';
import { fadeInOut } from 'ng-devui/utils';

@Component({
    selector: 'd-fade-in-out',
    templateUrl: './fade-in-out.component.html',
    styleUrls: ['./fade-in-out.component.scss'],
    animations: [fadeInOut],
    standalone: false
})
export class FadeInOutComponent implements OnInit {
  open = false;
  constructor() { }

  ngOnInit(): void {
  }

}
