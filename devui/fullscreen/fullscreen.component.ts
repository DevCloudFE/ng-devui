import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DEFAULT_MODE, DEFAULT_ZINDEX, ESC_KEYCODE } from './fullscreen.config';
import { FullscreenMode } from './fullscreen.type';

@Component({
  selector: 'd-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: [ './fullscreen.component.scss' ],
  preserveWhitespaces: false,
})
export class FullscreenComponent implements OnInit, OnDestroy, AfterViewInit {
  private currentTarget: HTMLElement;
  private isFullscreen = false;

  @Input() mode: FullscreenMode = DEFAULT_MODE;
  @Input() zIndex = DEFAULT_ZINDEX;
  @Input() target: HTMLElement;

  @Output() fullscreenLaunch: EventEmitter<any> = new EventEmitter<any>();
  document: Document;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.document.addEventListener('fullscreenchange', this.onFullScreenChange);
    this.document.addEventListener('MSFullscreenChange', this.onFullScreenChange);
    this.document.addEventListener('webkitfullscreenchange', this.onFullScreenChange);
    this.document.addEventListener('keydown', this.handleKeyDown);
  }

  ngAfterViewInit() {
    const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
    if (btnLaunch) { btnLaunch.addEventListener('click', this.handleFullscreen); }
  }

  private launchNormalFullscreen(targetElement: HTMLElement) {
    targetElement.classList.add('fullscreen');
    if (this.zIndex) {
      targetElement.setAttribute('style', `z-index: ${this.zIndex}`);
    }
  }

  private exitNormalFullscreen(targetElement: HTMLElement) {
    targetElement.classList.remove('fullscreen');
    targetElement.style.zIndex = null;
  }

  private async launchImmersiveFullScreen(docElement: any) {
    let fullscreenLaunch;
    if (docElement.requestFullscreen) {
      fullscreenLaunch = docElement.requestFullscreen();
    } else if (docElement.mozRequestFullScreen) {
      fullscreenLaunch = docElement.mozRequestFullScreen();
    } else if (docElement.webkitRequestFullScreen) {
      fullscreenLaunch = Promise.resolve(docElement.webkitRequestFullScreen());
    } else if (docElement.msRequestFullscreen) {
      fullscreenLaunch = Promise.resolve(docElement.msRequestFullscreen());
    }
    return await fullscreenLaunch.then(() => !!this.doc.fullscreenElement);
  }

  private async exitImmersiveFullScreen(doc: any) {
    let fullscreenExit;
    if (doc.exitFullscreen) {
      fullscreenExit = doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      fullscreenExit = doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      fullscreenExit = Promise.resolve(doc.webkitCancelFullScreen());
    } else if (doc.msExitFullscreen) {
      fullscreenExit = Promise.resolve(doc.msExitFullscreen());
    }
    return await fullscreenExit.then(() => !!this.doc.fullscreenElement);
  }

  private onFullScreenChange = (event) => {
    if (this.currentTarget) {
      const targetElement: HTMLElement = this.currentTarget;
      if (this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement) { // 进入全屏
        this.addFullScreenStyle();
        this.launchNormalFullscreen(targetElement);
      } else { // 退出全屏
        this.removeFullScreenStyle();
        this.currentTarget = null;
        this.exitNormalFullscreen(targetElement);
      }
      // F11退出全屏时，需要将全屏状态传出去
      const isFullscreen = !!(this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement);
      this.fullscreenLaunch.emit({
        isFullscreen
      });
      this.isFullscreen = isFullscreen;
    }
  };

  public handleFullscreen = async () => {
    const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
    let isFullscreen;
    if (this.mode === 'normal') {
      const fullscreen = targetElement.classList.contains('fullscreen');
      if (!fullscreen) { // 进入全屏
        this.addFullScreenStyle();
        this.launchNormalFullscreen(targetElement);
        isFullscreen = true;
      } else { // 退出全屏
        this.removeFullScreenStyle();
        this.exitNormalFullscreen(targetElement);
        isFullscreen = false;
      }
    } else {
      this.currentTarget = targetElement;
      if (this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement) {
        isFullscreen = await this.exitImmersiveFullScreen(this.doc);
      } else {
        isFullscreen = await this.launchImmersiveFullScreen(this.doc.documentElement);
      }
    }

    this.isFullscreen = isFullscreen;
    this.fullscreenLaunch.emit({
      isFullscreen
    });
  };

  private handleKeyDown = (event) => {
    if (event.keyCode === ESC_KEYCODE) { // 按ESC键退出全屏
      if (this.isFullscreen) {
        const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
        if (this.mode === 'normal') {
          this.removeFullScreenStyle();
          this.exitNormalFullscreen(targetElement);
        } else {
          if (this.doc.fullscreenElement) { this.exitImmersiveFullScreen(this.doc); }
        }
        this.fullscreenLaunch.emit({
          isFullscreen: false
        });
        this.isFullscreen = false;
      }
    }
  };

  ngOnDestroy() {
    this.document.removeEventListener('fullscreenchange', this.onFullScreenChange);
    this.document.removeEventListener('MSFullscreenChange', this.onFullScreenChange);
    this.document.removeEventListener('webkitfullscreenchange', this.onFullScreenChange);
    this.document.removeEventListener('keydown', this.handleKeyDown);
    const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
    if (btnLaunch) { btnLaunch.removeEventListener('click', this.handleFullscreen); }
  }

  private addFullScreenStyle() {
    this.document.getElementsByTagName('html')[0].classList.add('devui-fullscreen');
  }

  private removeFullScreenStyle() {
    this.document.getElementsByTagName('html')[0].classList.remove('devui-fullscreen');
  }
}
