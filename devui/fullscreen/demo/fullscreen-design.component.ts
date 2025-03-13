import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-fullscreen-design',
    templateUrl: './fullscreen-design.component.html',
    standalone: false
})

export class FullscreenDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
