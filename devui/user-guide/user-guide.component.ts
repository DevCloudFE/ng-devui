import {
  AfterViewInit, Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { Subscription } from 'rxjs';
import { UserGuideCoreService } from './user-guide-core.service';
import { UserGuideUIComponent } from './user-guide-ui.component';

@Component({
  selector: 'd-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss']
})
export class UserGuideComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() steps;
  @Input() userGuideEntrancePosition = {bottom: '30px', left: '30px'};
  @Input() showUserGuideEntrance = true;
  firstOpenShow: string;
  i18nCommonText: I18nInterface['userGuide'];
  i18nSubscription: Subscription;
  private currentTutorial: number;

  modalRef: ComponentRef<UserGuideUIComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private overlayContainerRef: OverlayContainerRef,
              private userGuideCoreService: UserGuideCoreService,
              private i18n: I18nService) { }
  ngOnInit() {
    this.firstOpenShow = localStorage.getItem('devui-user-guide-first-open-show') || 'true';

    this.i18nCommonText = this.i18n.getI18nText().userGuide;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.userGuide;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < this.steps.length; i++) {
        if (this.steps[i]?.defaultStart === true && this.firstOpenShow === 'true') {
          this.start(i);

          try {
            localStorage.setItem('devui-user-guide-first-open-show', 'false');
          } catch (error) {
            console.error(error);
          }

          break;
        }
      }
    }, 0);
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  start(index: number) {
    this.userGuideCoreService.setSteps(this.steps[index].detail);
    if (this.steps[index].onExit) {
      this.userGuideCoreService.setExitFunction(this.steps[index].onExit);
    }
    this.userGuideCoreService.isFinished.subscribe((item) => {
      this.steps[index].isFinished = item;
      if (item === true) {
        if (this.modalRef) {
          this.modalRef.hostView.destroy();
        }
      }
    });
    this.userGuideCoreService.start();
    this.createGuide(index);

    this.userGuideCoreService.next();

    this.currentTutorial = index;

    try {
      localStorage.setItem('devui-user-guide-last-tutorial', index.toString());
    } catch (error) {
      console.error(error);
    }
  }

  goStep(index: number) {
    let realStep = index;
    for (let i = 0 ; i < index; i++) {
      if (this.steps[this.currentTutorial].detail[i].type === 'interactable'
        && this.steps[this.currentTutorial].detail[i].eventType === 'clickable') {
        realStep = i;
        break;
      }
    }
    this.userGuideCoreService.goStep(realStep);
  }

  createGuide(index: number) {
    this.modalRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(UserGuideUIComponent)
    );
    this.modalRef.instance.showDots = this.steps[index]?.showDots;
    this.modalRef.instance.maxContentWidth = this.steps[index]?.maxContentWidth ? this.steps[index]?.maxContentWidth : 320;
    this.modalRef.instance.isCover = this.steps[index]?.isCover === undefined ? true: this.steps[index]?.isCover;
    this.modalRef.instance.extraConfig = this.steps[index]?.extraConfig;
    this.modalRef.instance.close = () => {
      if (this.modalRef) {
        this.modalRef.hostView.destroy();
      }
    };

    const panel = document.querySelector('.user-guide-panel') as HTMLElement;
    panel.style.visibility = 'hidden';
  }

}
