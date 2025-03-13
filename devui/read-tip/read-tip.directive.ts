import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { of } from 'rxjs';
import { ReadTipComponent } from './read-tip.component';
import { ReadTipOptions, ReadTipRule } from './read-tip.types';

@Directive({
    selector: '[dReadTip]',
    exportAs: 'dReadTip',
    standalone: false
})
export class ReadTipDirective implements OnInit, OnDestroy {
  readTipComponentRef: ComponentRef<ReadTipComponent>;

  _prevTarget;
  document: Document;

  defaultOptions: ReadTipOptions = {
    trigger: 'hover',
    showAnimate: false,
    mouseenterTime: 100,
    mouseleaveTime: 100,
    position: 'top',
    overlayClassName: '',
    appendToBody: true,
    rules: { selector: null },
  };

  set prevTarget(target) {
    if (target !== this._prevTarget) {
      this._prevTarget = target;
      this.hide();
    }
  }

  @Input() readTipOptions: ReadTipOptions;

  @Input() contentTemplate: TemplateRef<any>;

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.findElementIndex(event.target, this.readTipOptions?.rules, 'hover').subscribe((elementInfo) => {
      if (elementInfo?.shouldTrigger) {
        this.hide();
        if (!this.readTipComponentRef) {
          const target = new ElementRef(event.target);
          setTimeout(() => {
            this.show(target, elementInfo.rule);
          }, elementInfo.rule?.mouseenterTime);
        }
        if (this.readTipComponentRef) {
          setTimeout(() => {
            if (this.readTipComponentRef) {
              this.readTipComponentRef.instance.updatePosition();
            }
          }, elementInfo.rule?.mouseenterTime);
        }
      }
    });
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    this.findElementIndex(event.target, this.readTipOptions?.rules, 'hover').subscribe((elementInfo) => {
      if (elementInfo?.shouldTrigger) {
        setTimeout(() => {
          this.hide();
        }, elementInfo.rule?.mouseleaveTime);
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.findElementIndex(event.target, this.readTipOptions?.rules, 'click').subscribe((elementInfo) => {
      this.prevTarget = event.target;
      if (elementInfo?.shouldTrigger) {
        if (!this.readTipComponentRef) {
          const target = new ElementRef(event.target);
          this.show(target, elementInfo.rule);
        }
        if (this.readTipComponentRef) {
          setTimeout(() => {
            if (this.readTipComponentRef) {
              this.readTipComponentRef.instance.updatePosition();
            }
          });
        }
      }
    });
  }

  constructor(
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayContainerRef: OverlayContainerRef,
    private inject: Injector,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy();
  }

  show(target, rule?: ReadTipRule) {
    this.hide();
    if (!this.readTipComponentRef) {
      this.createReadTip(target, rule);
    }

    if (rule.showAnimate) {
      this.readTipComponentRef.instance.show();
    }
    if (rule.trigger === 'click') {
      this.document.addEventListener('click', this.onDocumentClick);
    }
  }

  createReadTip(target, rule?: ReadTipRule) {
    if (rule.appendToBody) {
      this.readTipComponentRef = this.overlayContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(ReadTipComponent)
      );
    } else {
      this.readTipComponentRef = this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(ReadTipComponent),
        this.viewContainerRef.length,
        this.inject
      );
    }

    if (this.contentTemplate) {
      Object.assign(this.readTipComponentRef.instance, {
        content: this.contentTemplate,
        triggerElementRef: target,
        appendToBody: rule.appendToBody,
        position: rule.position,
        overlayClassName: rule.overlayClassName,
      });
    } else {
      if (rule.dataFn) {
        rule.dataFn({ element: target.nativeElement, rule }).subscribe((data) => {
          if (data.template) {
            Object.assign(this.readTipComponentRef.instance, {
              content: data.template,
              customData: data.customData,
              triggerElementRef: target,
              appendToBody: rule.appendToBody,
              position: rule.position,
              overlayClassName: rule.overlayClassName,
            });
          } else {
            Object.assign(this.readTipComponentRef.instance, {
              content: data.content,
              title: data.title,
              triggerElementRef: target,
              appendToBody: rule.appendToBody,
              position: rule.position,
              overlayClassName: rule.overlayClassName,
            });
          }
        });
      } else {
        Object.assign(this.readTipComponentRef.instance, {
          content: rule.content,
          title: rule.title,
          triggerElementRef: target,
          appendToBody: rule.appendToBody,
          position: rule.position,
          overlayClassName: rule.overlayClassName,
        });
      }
    }
  }

  hide() {
    if (this.readTipComponentRef) {
      if (!this.readTipOptions.showAnimate) {
        this.destroy();
        return;
      }

      this.readTipComponentRef.instance.hide();
      this.readTipComponentRef.instance.onHidden = () => {
        this.destroy();
      };
    }
  }

  destroy() {
    if (this.readTipComponentRef) {
      this.readTipComponentRef.destroy();
      this.readTipComponentRef = null;
    }
    if (this.readTipOptions.trigger === 'click') {
      this.document.removeEventListener('click', this.onDocumentClick);
    }
  }

  onDocumentClick = (event) => {
    event.stopPropagation();
    if (
      !this.el.nativeElement.contains(event.target) &&
      !(this.readTipComponentRef && this.readTipComponentRef.instance.elementRef.nativeElement.contains(event.target))
    ) {
      this.hide();
    }
  };

  findElementIndex(element, rules, trigger) {
    const keysCanInherit = ['trigger', 'showAnimate', 'mouseenterTime', 'mouseleaveTime', 'position', 'overlayClassName', 'appendToBody'];
    if (rules instanceof Array) {
      let elementIndex = -1;

      for (let i = 0; i < rules.length; i++) {
        if (this.isCorrectElement(rules[i].selector, element)) {
          elementIndex = i;
          break;
        }
      }

      keysCanInherit.forEach((key) => {
        if (rules[elementIndex]) {
          rules[elementIndex][key] = rules[elementIndex][key] || this.readTipOptions[key] || this.defaultOptions[key];
        }
      });
      return of({
        shouldTrigger: rules[elementIndex]?.trigger === trigger && this.isCorrectElement(rules[elementIndex]?.selector, element),
        rule: rules[elementIndex],
      });
    } else {
      keysCanInherit.forEach((key) => {
        if (rules) {
          rules[key] = rules[key] || this.readTipOptions[key] || this.defaultOptions[key];
        }
      });
      return of({
        shouldTrigger: rules?.trigger === trigger && this.isCorrectElement(rules?.selector, element),
        rule: rules,
      });
    }
  }

  isCorrectElement(selector: string, element) {
    const elementsArray = this.el.nativeElement.querySelectorAll(selector);
    for (let i = 0; i < elementsArray.length; i++) {
      if (elementsArray[i] === element) {
        return true;
      }
    }
    return false;
  }
}
