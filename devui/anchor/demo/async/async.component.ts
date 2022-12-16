import { NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { AnchorDirective, AnchorBoxDirective, AnchorLinkDirective } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/sticky';

@Component({
  selector: 'd-anchor-async',
  standalone: true,
  imports: [
    NgIf,
    AnchorDirective,
    AnchorBoxDirective,
    AnchorLinkDirective,
    ButtonModule,
    StickyModule
  ],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class AsyncComponent {
  loadMenu = false;
  loadContent = false;
}
