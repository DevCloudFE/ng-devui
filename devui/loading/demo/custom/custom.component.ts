import {
  Component,
  OnInit
} from '@angular/core';
import { timer } from 'rxjs';
import { pullAt, random } from 'lodash-es';
import { LoadingType } from 'ng-devui';


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
  selector: 'ave-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {
  loading2: LoadingType;
  showLoading = false;
  tableNames: string[][] = [[]];
  constructor() {
    this.loading2 = undefined;
  }

  ngOnInit() {
  }

  fetchCustomLoading() {
    this.loading2 = timer(3500).toPromise();
  }

}
