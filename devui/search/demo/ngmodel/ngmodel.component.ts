import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-ngmodel',
  templateUrl: './ngmodel.component.html',
  styleUrls: ['./ngmodel.component.css']
})
export class NgmodelComponent implements OnInit {
  searchText = 'devui';
  constructor() { }

  ngOnInit() {
  }

  onSearch(term) {
    console.log(term);
  }

}
