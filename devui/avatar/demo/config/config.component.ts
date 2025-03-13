import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-config',
    styleUrls: ['./config.component.css'],
    templateUrl: './config.component.html',
    standalone: false
})
export class ConfigComponent {
  imgSrc = environment.deployPrefix + 'assets/logo.svg';
}
