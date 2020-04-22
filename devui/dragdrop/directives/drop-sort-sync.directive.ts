import { Directive, Input, ElementRef, Optional, Self, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DroppableDirective } from './droppable.directive';
import { DragDropSyncService } from '../services/drag-drop-sync.service';
import { Utils } from '../shared/utils';
import { DragPlaceholderInsertionEvent, DragPlaceholderInsertionIndexEvent } from './placeholder-insertion-event.type';
import { DescendantChildren } from '../services/drag-drop-desc-reg.service';
import { DropSortSyncDescendantRegisterService } from '../services/drag-drop-descendant-sync.service';

@Directive({
  selector: '[dDropSortSync]',
  exportAs: 'dDropSortSync'
})

export class DropSortSyncDirective extends DescendantChildren<DropSortSyncDirective> implements OnInit, OnDestroy {
  @Input('dDropSortSync') dropSyncGroup = '';
  @Input('dropSyncDirection') direction: 'v'| 'h' = 'v'; // 与sortContainer正交的方向
  subscription: Subscription = new Subscription();
  syncGroupDirectives: Array<DropSortSyncDirective>;
  placeholder: HTMLElement;
  sortContainer: HTMLElement;

  constructor(
    public el: ElementRef,
    @Optional() @Self() private droppable: DroppableDirective,
    private dragDropSyncService: DragDropSyncService,
    private dropSortSyncDrs: DropSortSyncDescendantRegisterService,
  ) {
    super(dropSortSyncDrs);
    this.descendantItem = this;
  }

  ngOnInit() {
    this.sortContainer = this.el.nativeElement;
    if (this.droppable) {
      this.sortContainer = this.droppable.getSortContainer();
      this.subscription.add(
        this.droppable.placeholderInsertionEvent.subscribe(this.subInsertionEvent)
      ).add(
        this.droppable.placeholderRenderEvent.subscribe(this.subRenderEvent)
      );
    }
    super.ngOnInit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
  subRenderEvent = (nativeStyle: {width: number, height: number}) => {
    this.syncGroupDirectives = this.dragDropSyncService.getDropSyncByGroup(this.dropSyncGroup).filter(directive => directive !== this);
    this.syncGroupDirectives.forEach(dir => {
      dir.renderPlaceholder(nativeStyle, this.droppable);
    });
  }

  subInsertionEvent = (cmd: DragPlaceholderInsertionIndexEvent) => {
    this.syncGroupDirectives = this.dragDropSyncService.getDropSyncByGroup(this.dropSyncGroup).filter(directive => directive !== this);
    this.syncGroupDirectives.forEach(dir => {
      dir.insertPlaceholderCommand({
        command: cmd.command,
        container: dir.sortContainer,
        relatedEl: dir.getChildrenElByIndex(dir.sortContainer, cmd.index)
      });
    });
  }
  getChildrenElByIndex(target, index?) {
    if (index === undefined || target && target.children && target.children.length < index || index < 0) {
      return null;
    }
    return this.sortContainer.children.item(index);
  }

  renderPlaceholder(nativeStyle: {width: number, height: number}, droppable) {
    if (!this.placeholder) {
      this.placeholder = document.createElement(droppable.placeholderTag);
      this.placeholder.className = 'drag-placeholder';
      this.placeholder.classList.add('drag-sync-placeholder');
      this.placeholder.innerText = droppable.placeholderText;
    }
    const {width, height} = nativeStyle;
    if (this.direction === 'v') {
      this.placeholder.style.width = width + 'px';
      this.placeholder.style.height = this.sortContainer.getBoundingClientRect().height + 'px';
    } else {
      this.placeholder.style.height = height + 'px';
      this.placeholder.style.width = this.sortContainer.getBoundingClientRect().width + 'px';
    }
    Utils.addElStyles(this.placeholder, droppable.placeholderStyle);

  }

  insertPlaceholderCommand(cmd: DragPlaceholderInsertionEvent) {
    if (cmd.command === 'insertBefore' && cmd.container) {
      cmd.container.insertBefore(this.placeholder, cmd.relatedEl);
      return;
    }
    if (cmd.command === 'append' && cmd.container) {
      cmd.container.appendChild(this.placeholder);
      return;
    }
    if (cmd.command === 'remove' && cmd.container) {
      if (cmd.container.contains(this.placeholder)) {
        cmd.container.removeChild(this.placeholder);
      }
      return;
    }
  }

}
