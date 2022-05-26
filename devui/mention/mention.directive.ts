import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MentionComponent } from './mention.component';
import { Mention, MentionOnSearchTypes, MentionPositionType } from './mention.types';
import { DEFAULT_MENTION_BOTTOM_POSITIONS } from './position';
import { getCaretCoordinates } from './utils';

@Directive({
  selector: '[dMention]',
  exportAs: 'dMention',
})
export class MentionDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  get nativeElement() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private overlay: Overlay
  ) {}
  @Input() mentionNotFoundContent = 'No suggestion matched';

  @Input() mentionSuggestions = [];

  @Input() mentionLoading = false;

  @Input() mentionTrigger = ['@'];

  @Input() mentionPosition: MentionPositionType = 'bottom';

  @Input() mentionItemTemplate: TemplateRef<any>;

  @Output() mentionSelectItem = new EventEmitter();

  @Output() mentionSearchChange: EventEmitter<MentionOnSearchTypes> = new EventEmitter();

  @Output() mentionAfterMentionInit: EventEmitter<MentionDirective> = new EventEmitter();

  private value = '';
  private previousValue = '';
  private cursorMention: any;
  private cursorMentionStart: number;
  private cursorMentionEnd: number;
  private cursorEnd: number;
  private overlayRef: OverlayRef | null = null;
  private portal?: ComponentPortal<MentionComponent>;
  private positionStrategy!: FlexibleConnectedPositionStrategy;
  private mentionRef: ComponentRef<MentionComponent>;
  private filterSuggestions = [];

  isOpen = false;

  activeIndex = -1;

  unsubscribe$ = new Subject();

  defaultNotFoundText = '';

  @Input() mentionValueParse: (value: string) => string = (value) => value;

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    if (this.mentionRef) {
      const keyCode = event.keyCode;
      if (this.isOpen && keyCode === ENTER && this.activeIndex !== -1 && this.filterSuggestions.length) {
        this.selectSuggestion(this.filterSuggestions[this.activeIndex]);
        event.preventDefault();
      } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        if (keyCode === LEFT_ARROW) {
          this.cursorMentionStart = this.cursorMentionStart - 1;
        } else {
          this.cursorMentionStart = this.cursorMentionStart + 1;
        }
        event.stopPropagation();
        setTimeout(() => {
          this.resetMention();
        });
      } else {
        if (this.isOpen && (keyCode === TAB || keyCode === ESCAPE)) {
          this.hideMention();
          return;
        }

        if (this.isOpen && keyCode === UP_ARROW) {
          event.preventDefault();
          event.stopPropagation();
          this.setPreviousItemActive();
        }

        if (this.isOpen && keyCode === DOWN_ARROW) {
          event.preventDefault();
          event.stopPropagation();
          this.setNextItemActive();
        }
      }
      this.setMentionData();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(e) {
    if (this.overlayRef && this.isOpen) {
      if (!this.nativeElement.contains(e.target)) {
        this.hideMention();
      }
    } else if (this.nativeElement.contains(e.target)) {
      this.resetMention();
    }
  }

  ngOnInit(): void {
    this.mentionAfterMentionInit.emit(this);
  }

  ngAfterViewInit(): void {
    fromEvent(this.el.nativeElement, 'input')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.resetMention();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.prototype.hasOwnProperty.call(changes, 'mentionSuggestions')) {
      if (this.isOpen) {
        this.previousValue = null;
        this.activeIndex = -1;
        this.resetMention(false);
      }
    }
  }

  resetMention(emit = true) {
    this.checkMention();
    if (!this.cursorMention) {
      this.hideMention();
      return;
    }
    this.suggestionsFilter(this.cursorMention, emit);
    const activeIndex = this.filterSuggestions.indexOf(this.cursorMention.substring(1));
    this.activeIndex = activeIndex >= 0 ? activeIndex : 0;
    this.showMention();
  }

  checkMention() {
    const value = this.nativeElement.value.replace(/[\r\n]/g, ' ') || '';
    const selectionStart = this.nativeElement.selectionStart;
    let i = this.mentionTrigger.length;
    while (i >= 0) {
      const startPos = value.lastIndexOf(this.mentionTrigger[i], selectionStart);
      const endPos = value.indexOf(' ', selectionStart) > -1 ? value.indexOf(' ', selectionStart) : value.length;
      const mention = value.substring(startPos, selectionStart);
      if (
        (startPos > 0 && value[startPos - 1] !== ' ') ||
        startPos < 0 ||
        mention.includes(this.mentionTrigger[i], 1) ||
        mention.includes(' ')
      ) {
        this.cursorMention = null;
        this.cursorMentionStart = -1;
        this.cursorMentionEnd = -1;
        this.cursorEnd = -1;
        this.value = '';
      } else {
        this.cursorMention = mention[0];
        this.cursorMentionStart = startPos;
        this.cursorMentionEnd = endPos;
        this.cursorEnd = selectionStart;
        this.value = mention.slice(1);
        return;
      }
      i--;
    }
  }

  hideMention() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.cdr.markForCheck();
      this.isOpen = false;
    }
  }

  showMention() {
    this.attachOverlay();
    this.isOpen = true;
    this.cdr.markForCheck();
  }

  attachOverlay() {
    if (!this.overlayRef) {
      this.portal = new ComponentPortal(MentionComponent, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.mentionRef = this.overlayRef.attach(this.portal);
      this.mentionRef.instance.mentionItemTemplate = this.mentionItemTemplate;
      this.mentionRef.instance.mentionNotFoundContent = this.mentionNotFoundContent;
    }
    this.updatePositions();
  }

  getOverlayConfig() {
    const target = this.el;
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(target),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true,
    });
  }

  getOverlayPosition(target) {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    ];
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
    return this.positionStrategy;
  }

  updatePositions() {
    const coordinates = getCaretCoordinates(this.nativeElement, this.cursorEnd);
    const top = coordinates.top - this.nativeElement.getBoundingClientRect().height - this.nativeElement.scrollTop;
    const left = coordinates.left - this.nativeElement.scrollLeft;
    this.positionStrategy.withDefaultOffsetX(left).withDefaultOffsetY(top);
    this.positionStrategy.withPositions([...DEFAULT_MENTION_BOTTOM_POSITIONS]);
    this.positionStrategy.apply();
    this.setMentionData();
  }

  suggestionsFilter(value: string, emit: boolean) {
    if (this.previousValue === value && value !== this.cursorMention[0]) {
      return;
    }
    this.previousValue = value;
    if (emit) {
      this.mentionSearchChange.emit({
        value: this.value,
        trigger: this.cursorMention,
      });
    }
    const searchValue = this.value.toLowerCase();
    this.filterSuggestions = this.mentionSuggestions.filter((suggestion) =>
      this.mentionValueParse(suggestion).toLowerCase().includes(searchValue)
    );
  }

  setMentionData() {
    Object.assign(this.mentionRef.instance, {
      suggestions: this.filterSuggestions,
      activeIndex: this.activeIndex,
      loading: this.mentionLoading,
      trigger: this,
      position: this.mentionPosition,
    });
  }

  selectSuggestion(suggestion) {
    const value = this.mentionValueParse(suggestion);
    this.insertMention({
      mention: value,
      startPos: this.cursorMentionStart,
      endPos: this.cursorMentionEnd,
    });
    this.mentionSelectItem.emit(suggestion);
    this.hideMention();
    this.activeIndex = -1;
  }

  insertMention(mention: Mention) {
    const value: string = this.el.nativeElement.value;
    const insertValue = mention.mention.trim() + ' ';
    const newValue = [value.slice(0, mention.startPos + 1), insertValue, value.slice(mention.endPos, value.length)].join('');
    this.el.nativeElement.value = newValue;
    this.value = newValue;
  }

  setPreviousItemActive() {
    this.activeIndex = this.activeIndex - 1 < 0 ? this.filterSuggestions.length - 1 : this.activeIndex - 1;
    this.cdr.markForCheck();
    setTimeout(() => {
      if (this.mentionRef) {
        this.mentionRef.instance.scrollToFocusItem();
      }
    });
  }

  setNextItemActive() {
    this.activeIndex = this.activeIndex + 1 <= this.filterSuggestions.length - 1 ? this.activeIndex + 1 : 0;
    this.cdr.markForCheck();
    setTimeout(() => {
      if (this.mentionRef) {
        this.mentionRef.instance.scrollToFocusItem();
      }
    });
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
