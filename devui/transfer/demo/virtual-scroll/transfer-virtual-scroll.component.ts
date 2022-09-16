import { Component } from '@angular/core';

@Component({
  selector: 'd-demo-transfer-virtual-scroll',
  templateUrl: './transfer-virtual-scroll.component.html',
  styleUrls: ['./transfer-virtual-scroll.component.scss'],
})
export class TransferVirtualScrollComponent {
  disabled = false;
  sourceOption = [
    { name: 'Option1', value: 1, id: 1, checked: false },
    { name: 'Option2', value: 2, id: 2, checked: false },
    { name: 'Option3', value: 3, id: 3, checked: false },
    { name: 'Option4', value: 3, id: 4, checked: false },
    { name: 'Option5', value: 3, id: 5, checked: false },
    { name: 'Option6', value: 3, id: 6, checked: false },
    { name: 'Option7', value: 3, id: 7, checked: false },
    { name: 'Option8', value: 3, id: 8, checked: false },
    { name: 'Option9', value: 3, id: 9, checked: false },
    { name: 'Option10', value: 3, id: 10, checked: false },
    { name: 'Option11', value: 3, id: 11, checked: false },
    { name: 'Option12', value: 3, id: 12, checked: false },
    { name: 'Option13', value: 3, id: 13, checked: false },
    { name: 'Option14', value: 3, id: 14, checked: false },
    { name: 'Option15', value: 3, id: 15, checked: false },
    { name: 'Option16', value: 3, id: 16, checked: false },
    { name: 'Option17', value: 3, id: 17, checked: false },
    { name: 'Option18', value: 3, id: 18, checked: false },
    { name: 'Option19', value: 3, id: 19, checked: false },
    { name: 'Option20', value: 1, id: 20, checked: false },
    { name: 'Option21', value: 2, id: 21, checked: false },
    { name: 'Option22', value: 3, id: 22, checked: false },
    { name: 'Option23', value: 3, id: 23, checked: false },
    { name: 'Option24', value: 3, id: 24, checked: false },
    { name: 'Option25', value: 3, id: 25, checked: false },
    { name: 'Option26', value: 3, id: 26, checked: false },
    { name: 'Option27', value: 3, id: 27, checked: false },
    { name: 'Option28', value: 3, id: 28, checked: false },
    { name: 'Option29', value: 3, id: 29, checked: false },
    { name: 'Option30', value: 3, id: 30, checked: false },
    { name: 'Option31', value: 3, id: 31, checked: false },
    { name: 'Option32', value: 3, id: 32, checked: false },
    { name: 'Option33', value: 3, id: 33, checked: false },
    { name: 'Option34', value: 3, id: 34, checked: false },
    { name: 'Option35', value: 3, id: 35, checked: false },
    { name: 'Option36', value: 3, id: 36, checked: false },
    { name: 'Option37', value: 3, id: 37, checked: false },
    { name: 'Option38', value: 3, id: 38, checked: false },
    { name: 'Option39', value: 3, id: 39, checked: false },
    { name: 'Option40', value: 3, id: 40, checked: false },
    { name: 'Option41', value: 1, id: 41, checked: false },
    { name: 'Option42', value: 2, id: 42, checked: false },
    { name: 'Option43', value: 3, id: 43, checked: false },
    { name: 'Option44', value: 3, id: 44, checked: false },
    { name: 'Option45', value: 3, id: 45, checked: false },
    { name: 'Option46', value: 3, id: 46, checked: false },
    { name: 'Option47', value: 3, id: 47, checked: false },
    { name: 'Option48', value: 3, id: 48, checked: false },
    { name: 'Option49', value: 3, id: 49, checked: false },
    { name: 'Option50', value: 3, id: 50, checked: false },
    { name: 'Option51', value: 1, id: 51, checked: false },
    { name: 'Option52', value: 2, id: 52, checked: false },
    { name: 'Option53', value: 3, id: 53, checked: false },
    { name: 'Option54', value: 3, id: 54, checked: false },
    { name: 'Option55', value: 3, id: 55, checked: false },
    { name: 'Option56', value: 3, id: 56, checked: false },
    { name: 'Option57', value: 3, id: 57, checked: false },
    { name: 'Option58', value: 3, id: 58, checked: false },
    { name: 'Option59', value: 3, id: 59, checked: false },
    { name: 'Option60', value: 3, id: 60, checked: false },
    { name: 'Option61', value: 1, id: 61, checked: false },
    { name: 'Option62', value: 2, id: 62, checked: false },
    { name: 'Option63', value: 3, id: 63, checked: false },
    { name: 'Option64', value: 3, id: 64, checked: false },
    { name: 'Option65', value: 3, id: 65, checked: false },
    { name: 'Option66', value: 3, id: 66, checked: false },
    { name: 'Option67', value: 3, id: 67, checked: false },
    { name: 'Option68', value: 3, id: 68, checked: false },
    { name: 'Option69', value: 3, id: 69, checked: false },
    { name: 'Option70', value: 3, id: 70, checked: false },
    { name: 'Option71', value: 1, id: 71, checked: false },
    { name: 'Option72', value: 2, id: 72, checked: false },
    { name: 'Option73', value: 3, id: 73, checked: false },
    { name: 'Option74', value: 3, id: 74, checked: false },
    { name: 'Option75', value: 3, id: 75, checked: false },
    { name: 'Option76', value: 3, id: 76, checked: false },
    { name: 'Option77', value: 3, id: 77, checked: false },
    { name: 'Option78', value: 3, id: 78, checked: false },
    { name: 'Option79', value: 3, id: 79, checked: false },
    { name: 'Option80', value: 3, id: 80, checked: false },
    { name: 'Option81', value: 1, id: 81, checked: false },
    { name: 'Option82', value: 2, id: 82, checked: false },
    { name: 'Option83', value: 3, id: 83, checked: false },
    { name: 'Option84', value: 3, id: 84, checked: false },
    { name: 'Option85', value: 3, id: 85, checked: false },
    { name: 'Option86', value: 3, id: 86, checked: false },
    { name: 'Option87', value: 3, id: 87, checked: false },
    { name: 'Option88', value: 3, id: 88, checked: false },
    { name: 'Option89', value: 3, id: 89, checked: false },
    { name: 'Option90', value: 3, id: 90, checked: false },
    { name: 'Option91', value: 1, id: 91, checked: false },
    { name: 'Option92', value: 2, id: 92, checked: false },
    { name: 'Option93', value: 3, id: 93, checked: false },
    { name: 'Option94', value: 3, id: 94, checked: false },
    { name: 'Option95', value: 3, id: 95, checked: false },
    { name: 'Option96', value: 3, id: 96, checked: false },
    { name: 'Option97', value: 3, id: 97, checked: false },
    { name: 'Option98', value: 3, id: 98, checked: false },
    { name: 'Option99', value: 3, id: 99, checked: false },
    { name: 'Option100', value: 3, id: 100, checked: false },
  ];

  targetOption = [];

  transferToTarget(data: any) {
    console.log(data);
  }

  transferToSource(data: any) {
    console.log(data);
  }

  onChange(event: any) {
    this.disabled = event;
  }

  constructor() {}
}
