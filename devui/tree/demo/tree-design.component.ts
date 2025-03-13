import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-tree-design',
    templateUrl: './tree-design.component.html',
    standalone: false
})

export class TreeDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
