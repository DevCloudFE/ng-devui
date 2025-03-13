import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-toast-design',
    templateUrl: './toast-design.component.html',
    standalone: false
})

export class ToastDesignComponent implements OnInit {
  imgSrc;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
