import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  imgSrc: string;
  constructor() { }

  ngOnInit(): void {
    this.imgSrc = environment.production ? './components/assets/logo.svg' : './assets/logo.svg';

  }

}
