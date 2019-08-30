import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-customize-tmp',
  templateUrl: './customize-tmp.component.html',
})
export class CustomizeTmpComponent implements OnInit {
  tab2acticeID = 'tab2';
  tabItems = [
    {
      id: 'tab1',
      title: 'home',
      disabled: true,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
      id: 'tab2',
      title: 'Profile',
      content: `Fames ac turpis egestas maecenas pharetra.`
    },
    {
      id: 'tab3',
      title: 'Fat',
      content: `Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor.`
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
