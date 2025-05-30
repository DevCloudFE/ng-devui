import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'd-modal-no-btn',
    templateUrl: './modal-no-btn.component.html',
    styleUrls: ['./modal-no-btn.component.scss'],
    standalone: false
})
export class ModalNoBtnComponent implements OnInit {
  constructor(private elr: ElementRef) {}
  parent: HTMLElement;
  @Input() data: any;
  ngOnInit() {
    this.parent = this.elr.nativeElement.parentElement;
  }

  close(event) {
    this.data.onClose(event);
  }
}
