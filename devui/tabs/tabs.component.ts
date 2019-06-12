import {
  Component,
  OnInit,
  QueryList,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterContentInit,
  HostBinding
} from '@angular/core';
import { TabComponent } from './tab.component';


@Component({
  selector: 'ave-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  exportAs: 'tabs',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterContentInit {
  @Input() type: 'tabs' | 'options' = 'tabs';
  @Input() showContent = true;
  @Input() activeTab: number |string;
  @Input() cssClass: string;
  @Input() customWidth: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number| string>();
  @HostBinding('attr.ave-ui') aveUi = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.activeTab === undefined && this.tabs.length > 0) {
      this.select(this.tabs.first.id);
    }
  }

  select(id: number | string) {
    const tab = this.tabs.find(item => item.id === id);
    if (tab && !tab.disabled) {
      this.activeTab = id;
      this.activeTabChange.emit(id);
    }
  }

}
