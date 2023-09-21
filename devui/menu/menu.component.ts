import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Component({
  selector: 'd-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss'],
  preserveWhitespaces: false,
  })
export class MenuComponent implements OnInit {
  ngOnInit() { }
}
