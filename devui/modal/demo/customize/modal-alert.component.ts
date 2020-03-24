import { Input, Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'd-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {
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
