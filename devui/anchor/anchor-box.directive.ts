import { ContentChildren, Directive, Input, QueryList, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription} from 'rxjs';
import { AnchorActiveChangeSource, IAnchorBox } from './anchor.type';
import { AnchorDirective } from './anchor.directive';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[dAnchorBox]'
})
export class AnchorBoxDirective implements IAnchorBox, OnDestroy {
  public isScrollingToTarget = false;
  private activeChangeSubject = new Subject();
  public activeChange = this.activeChangeSubject.asObservable();
  sub: Subscription;
  @Input() view: {
    top?: number,
    bottom?: number
  };
  @Input() defaultAnchor: string;
  @Input() scrollTarget: HTMLElement;
  refreshAnchorMap: Subject<any> = new Subject<any>();
  anchorMap: {
    [anchor: string]: AnchorDirective;
  };

  _anchorList: QueryList<AnchorDirective>;
  @ContentChildren(AnchorDirective, {descendants: true})
  set anchorList(list: QueryList<AnchorDirective>) {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = new Subscription();
    this.anchorMap = {};
    this._anchorList = list;
    this._anchorList.toArray().forEach(targetAnchor => {
        this.anchorMap[targetAnchor.anchor] = targetAnchor;
        targetAnchor.boxElement = this;
        this.sub.add(
          targetAnchor.activeChangeSubject.pipe(filter(bool => !!bool)).subscribe(() => {
            this.activeChangeSubject.next(targetAnchor);
          }));
    });
    this.refreshAnchorMap.next();
  }
  get anchorList() {
    return this._anchorList;
  }

  forceActiveAnchor(anchorName: string, forceActiveSource: AnchorActiveChangeSource = 'scroll', deactivateOtherAnchor = true) {
    this.anchorMap[anchorName].activeChangeBy = forceActiveSource;
    this.anchorMap[anchorName].isActive = true;
    if (deactivateOtherAnchor) {
      Object.keys(this.anchorMap)
            .filter(name => name !== anchorName)
            .map(name => this.anchorMap[name])
            .forEach(anchor => {
              anchor.activeChangeBy = forceActiveSource;
              anchor.isActive = false;
            });
    }
  }
  ngOnDestroy() {
    this.activeChangeSubject.complete();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
