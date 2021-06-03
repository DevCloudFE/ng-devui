import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'd-demo-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements AfterViewInit {

  @ViewChild('navSprite', {static: true}) navSprite;

  ngAfterViewInit () {
    this.navSprite.getNavData();
  }

}
