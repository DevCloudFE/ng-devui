import { ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { Subject} from 'rxjs';
import { AnchorActiveChangeSource, IAnchorBox } from './anchor.type';
import { AnchorDirective } from './anchor.directive';

@Directive({
  selector: '[dAnchorBox]'
})
export class AnchorBoxDirective implements IAnchorBox {
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
    this.anchorMap = {};
    this._anchorList = list;
    this._anchorList.toArray().forEach(targetAnchor => {
        this.anchorMap[targetAnchor.anchor] = targetAnchor;
        targetAnchor.boxElement = this;
    });
    this.refreshAnchorMap.next();
  }
  get anchorList() {
    return this._anchorList;
  }

  constructor() {
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
}
