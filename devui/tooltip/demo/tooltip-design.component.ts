import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-tooltip-design',
    templateUrl: './tooltip-design.component.html',
    standalone: false
})

export class TooltipDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
