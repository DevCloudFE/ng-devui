import { Component } from '@angular/core';
import { AnchorDirective, AnchorBoxDirective, AnchorLinkDirective, } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/sticky';

@Component({
  selector: 'd-anchor-scroll-target',
  standalone: true,
  imports: [
    AnchorDirective,
    AnchorBoxDirective,
    AnchorLinkDirective,
    ButtonModule,
    StickyModule
  ],
  templateUrl: './scroll-target.component.html',
  styleUrls: ['./scroll-target.component.scss']
})
export class ScrollTargetComponent {

}
