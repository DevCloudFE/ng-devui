import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-multi-auto-complete-design',
    templateUrl: './multi-auto-complete-design.component.html',
    standalone: false
})

export class MultiAutoCompleteDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
