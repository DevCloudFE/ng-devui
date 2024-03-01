import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { IButtonStyle } from 'ng-devui/button';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
import { UserGuideCoreService } from './user-guide-core.service';
import { IUserGuideExtraConfig } from './user-guide.types';

@Component({
  selector: 'd-user-guide-ui',
  templateUrl: './user-guide-ui.component.html',
  styleUrls: ['./user-guide-ui.component.scss']
})
export class UserGuideUIComponent implements OnInit, OnDestroy {
  i18nCommonText: I18nInterface['userGuide'];
  i18nSubscription: Subscription;
  @Input() showDots = false;
  @Input() maxContentWidth = 320;
  @Input() isCover = true;
  @Input() extraConfig: IUserGuideExtraConfig;
  stepsLength: number;
  currentStep: number;
  curStepType: string;
  title: string;
  content: string | TemplateRef<any>;
  canNext: boolean;
  canPrev: boolean;
  canFinish: boolean;

  showMaskLayer = false;

  showNormalOverlay = false;

  showTopOverlay = false;
  showBottomOverlay = false;
  showLeftOverlay = false;
  showRightOverlay = false;

  showBorder = false;

  showButtons = true;
  showOperateZone = false;

  showPrevButton = true;

  items = [];
  get contentTemplate(): TemplateRef<any> {
    return this.content as TemplateRef<any>;
  }

  get nextButtonType(): IButtonStyle {
    return (this.extraConfig?.nextButtonType || 'primary') as IButtonStyle;
  }
  constructor(private userGuideCoreService: UserGuideCoreService, private i18n: I18nService) { }

  ngOnInit() {
    this.userGuideCoreService.curContent.subscribe(item => {this.title = item;});
    this.userGuideCoreService.curSubContent.subscribe(item => {this.content = item;});
    this.userGuideCoreService.canNext.subscribe(item => {this.canNext = item;});
    this.userGuideCoreService.canPrev.subscribe(item => {this.canPrev = item;});
    this.userGuideCoreService.canFinish.subscribe(item => {this.canFinish = item;});
    this.userGuideCoreService.curStep.subscribe(item => {this.currentStep = item;});
    this.userGuideCoreService.curStepType.subscribe(item => {this.curStepType = item;});
    this.userGuideCoreService.showButtons.subscribe(item => {this.showButtons = item;});
    this.userGuideCoreService.showOperateZone.subscribe(item => {this.showOperateZone = item;});
    this.userGuideCoreService.showOverlayState.subscribe(item => {
      this.showMaskLayer = item.showMaskLayer;

      this.showNormalOverlay = item.showNormalOverlay;

      this.showTopOverlay = item.showTopOverlay;
      this.showBottomOverlay = item.showBottomOverlay;
      this.showLeftOverlay = item.showLeftOverlay;
      this.showRightOverlay = item.showRightOverlay;

      this.showBorder = item.showBorder;
    });
    this.userGuideCoreService.showPrevButton.subscribe(item => {this.showPrevButton = item;});

    this.stepsLength = this.userGuideCoreService.getStepLength();

    for (let i = 0; i < this.stepsLength; i++) {
      this.items.push(i);
    }
    this.i18nCommonText = this.i18n.getI18nText().userGuide;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.userGuide;
    });
  }

  next() {
    this.userGuideCoreService.next();
  }

  prev() {
    this.userGuideCoreService.prev();
  }

  exit() {
    this.userGuideCoreService.exit();
    this.close();
  }

  close() {

  }

  switchStep(index) {
    this.userGuideCoreService.goStep(index);
  }

  disableClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  isTemplateContent() {
    return this.content instanceof TemplateRef;
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
