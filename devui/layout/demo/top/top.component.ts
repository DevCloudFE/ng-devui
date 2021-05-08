import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'd-layout-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class LayoutTopComponent {
  logoSrc = environment.deployPrefix + 'assets/logo.svg';
}
