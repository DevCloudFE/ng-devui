import { Component, OnInit } from '@angular/core';
import { pullAt, random } from 'lodash-es';
import { LoadingType } from 'ng-devui';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 *  Mock HTTP Request.
 */
const mockFetchNames = (url: string) => new Promise((resolve) => {
  const mockNames = [
    'Arnold', 'Ashley', 'Atkins', 'Burton', 'Butler', 'Byers',
    'Byrd', 'Cabrera', 'Dyer', 'Eaton', 'Francis', 'Franco',
    'Stone', 'Talley', 'Tanner', 'Tyson', 'Underwood', 'Valdez',
    'Vang', 'Wade', 'Wynn', 'Yang', 'Young', 'Zamora', 'Zimmerman',
  ];

  const getRandomName = () => {
    const margin = mockNames.length - 1;
    return pullAt(
      mockNames,
      [
        random(margin),
        random(margin),
        random(margin),
      ],
    );
  };

  setTimeout(() => {
    resolve([
      getRandomName(),
      getRandomName(),
      getRandomName(),
    ]);
  }, 2500);
});

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  loading: LoadingType;
  tableNames: string[][] = [[]];
  constructor() {

  }

  ngOnInit() {
    this.loading = undefined;
  }

  fetchTableData() {
    this.loading = from(mockFetchNames('//example.com/names/random'))
      .pipe(
        tap((tablNames: string[][]) => {
          this.tableNames = tablNames;
        })
      );
  }

}
