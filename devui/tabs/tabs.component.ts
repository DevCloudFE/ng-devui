import {
  Component,
  OnInit,
  QueryList,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { TabComponent } from './tab.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'd-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  exportAs: 'tabs',
  preserveWhitespaces: false,
})
export class TabsComponent implements OnInit, AfterContentInit {
  @Input() type: 'tabs' | 'pills' | 'options' = 'tabs';
  @Input() showContent = true;
  @Input() activeTab: number | string;
  @Input() vertical = false;
  @Input() cssClass: string;
  @Input() customWidth: string;
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() activeTabChange = new EventEmitter<number | string>();
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  constructor() {
  }

  ngOnInit() {
  }
  canChange(currentTab: number | string) {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(currentTab);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  }
  ngAfterContentInit(): void {
    if (this.activeTab === undefined && this.tabs.length > 0) {
      this.select(this.tabs.first.id);
    }
  }

  select(id: number | string) {
    if (this.activeTab === id) {
      return;
    }
    this.canChange(id).then((change) => {
      if (!change) {
        return;
      }
      const tab = this.tabs.find(item => item.id === id);
      if (tab && !tab.disabled) {
        this.activeTab = id;
        this.activeTabChange.emit(id);
      }
    });
  }

}
