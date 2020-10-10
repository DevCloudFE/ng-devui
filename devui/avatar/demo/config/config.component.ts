import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'd-config',
    styleUrls: ['./config.component.css'],
    templateUrl: './config.component.html'
})
export class ConfigComponent {
    imgSrc = environment.production ? './components/assets/logo.svg' : './assets/logo.svg';
}
