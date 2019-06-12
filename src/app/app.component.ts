
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { VERSION } from 'ng-devui/version';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  version;

  ngOnInit(): void {
    this.version = VERSION.full;
  }

}
