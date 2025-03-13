import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-with-media',
    templateUrl: './with-media.component.html',
    styleUrls: ['./with-media.component.scss'],
    standalone: false
})
export class WithMediaComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/image1.png';
  }

}
