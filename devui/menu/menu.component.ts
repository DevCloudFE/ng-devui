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
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { MenuItemType } from './type';

@Component({
  selector: '[d-menu]',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
  '[class.devui-menu]': 'true',
  }
  })
export class MenuComponent implements OnInit {
  // @Input() options: MenuItemType[] = [];
  ngOnInit() { }
}
