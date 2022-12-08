import { Component } from '@angular/core';
import { AnchorDirective, AnchorBoxDirective, AnchorLinkDirective } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/sticky';

@Component({
  selector: 'd-anchor-basic',
  standalone: true,
  imports: [
    AnchorDirective,
    AnchorBoxDirective,
    AnchorLinkDirective,
    ButtonModule,
    StickyModule
  ],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {

}
