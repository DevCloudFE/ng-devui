import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ModalComponent } from 'ng-devui/modal';

@Component({
  selector: 'd-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  @Input() data: any;
  @Input() modalInstance: ModalComponent;
  constructor(private elr: ElementRef) {}
  parent: HTMLElement;
  ngOnInit() {
    this.parent = this.elr.nativeElement.parentElement;
    console.log(this.data);
  }

  close(event) {
    this.modalInstance.hide();
  }

}
