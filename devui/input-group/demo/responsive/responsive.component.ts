import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'd-input-group-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.scss'],
})
export class ResponsiveComponent implements OnInit {
  width = '100%';
  alarmRule = '';
  indicatorName = '';
  symbols = ['>', '<', '=', '!='];
  comparisonSymbol = '>';
  valueType = '';
  valueTypes = [];
  time = 300;
  timeOptions = [300, 500, 1000, 3000, 5000];
  tabActiveId: string | number = 'tab1';
  tabItems = [
    {
      id: 'tab1',
      title: '1 line',
      width: '100%',
    },
    {
      id: 'tab2',
      title: '2 lines',
      width: '760px',
    },
    {
      id: 'tab3',
      title: '3 lines',
      width: '500px',
    },
    {
      id: 'tab4',
      title: '4 lines',
      width: '300px',
    },
  ];
  subs: Subscription = new Subscription();
  i18nText: any;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subs.add(
      this.translate.get('components.input-group.responsiveDemo').subscribe((res) => {
        this.alarmRule = res.defaultRule;
        this.valueType = res.valueType;
        this.valueTypes = res.valueTypes.split(',');
      })
    );
  }

  activeTabChange(tabId: string | number): void {
    const tabItem = this.tabItems.find((item) => item.id === tabId);
    this.width = tabItem.width;
  }
}
