import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOOP_MENUS } from '../mock';
@Component({
  selector: 'd-loop',
  templateUrl: './loop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class LoopComponent {
  menus = LOOP_MENUS;
}
