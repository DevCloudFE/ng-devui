import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';


@Directive({ selector: '[d-file-drop]' }) // tslint:disable-line
export class FileDropDirective {
  @Input() enableDrop = false;
  @Input() isSingle = false;
  @Output() public fileOver: EventEmitter<any> = new EventEmitter();
  @Output() public fileDrop: EventEmitter<File[]> = new EventEmitter<File[]>();

  protected element: ElementRef;

  public constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('drop', [ '$event' ])
  public onDrop(event: any): void {
    if (!this.enableDrop) {
      return;
    }
    const transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }
    this._preventAndStop(event);
    if (this.isSingle) {
      this.fileDrop.emit([transfer.files[0]]);
    } else {
      this.fileDrop.emit(transfer.files);
    }
  }

  @HostListener('dragover', [ '$event' ])
  public onDragOver(event: any): void {
    if (!this.enableDrop) {
      return;
    }
    const transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }

    transfer.dropEffect = 'move';
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', [ '$event' ])
  public onDragLeave(event: any): any {
    if (!this.enableDrop) {
      return;
    }
    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[ 0 ]) {
        return;
      }
    }

    this._preventAndStop(event);
    this.fileOver.emit(false);
  }

  protected _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
  }

  protected _preventAndStop(event: any): any {
    event.preventDefault();
    event.stopPropagation();
  }

  protected _haveFiles(types: any): any {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  }
}
