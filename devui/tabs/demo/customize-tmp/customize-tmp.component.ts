import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ave-customize-tmp',
  templateUrl: './customize-tmp.component.html',
  styleUrls: ['./customize-tmp.component.css']
})
export class CustomizeTmpComponent implements OnInit {
  tab2acticeID = 'tab2';
  tabItems = [
      {
        id: 'tab1',
        title: 'home',
        disabled: true,
        content: `Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua`
      },
      {
        id: 'tab2',
        title: 'Profile',
        content: `Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1`
      },
      {
        id: 'tab3',
        title: 'Fat',
        content: `Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny`
      },
    ];
  constructor() { }

  ngOnInit() {
  }

}
