import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-input-group-design',
  templateUrl: './input-group-design.component.html',
})
export class InputGroupDesignComponent implements OnInit {
  imgSrc: string;

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
