import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-toggle-design',
  templateUrl: './toggle-design.component.html',
})
export class ToggleDesignComponent implements OnInit {
  imgSrc: string;

  ngOnInit(): void {
    this.imgSrc = environment.deployPrefix + 'assets/no-data.png';
  }
}
