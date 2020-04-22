import { Component, OnInit, OnDestroy, Input, Inject, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FullscreenMode } from './fullscreen.type';
import { DEFAULT_ZINDEX, DEFAULT_MODE, ESC_KEYCODE } from './fullscreen.config';

@Component({
  selector: 'd-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: [ './fullscreen.component.scss' ]
})
export class FullscreenComponent implements OnInit, OnDestroy, AfterViewInit {
  private currentTarget: HTMLElement;
  private isFullscreen = false;

  @Input() mode: FullscreenMode = DEFAULT_MODE;
  @Input() zIndex = DEFAULT_ZINDEX;
  @Input() target: HTMLElement;

  @Output() fullscreenLaunch: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: any
  ) { }

  ngOnInit() {
    document.addEventListener('fullscreenchange', this.onFullScreenChange);
    document.addEventListener('keydown', this.handleKeyDown);
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
      fullscreenLaunch = docElement.webkitRequestFullScreen();
    } else if (docElement.msRequestFullscreen) {
      fullscreenLaunch = docElement.msRequestFullscreen();
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
      fullscreenExit = doc.webkitCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      fullscreenExit = doc.msExitFullscreen();
    }
    return await fullscreenExit.then(() => !!this.doc.fullscreenElement);
  }

  private onFullScreenChange = (event) => {
    if (this.currentTarget) {
      const targetElement: HTMLElement = this.currentTarget;
      if (this.doc.fullscreenElement) { // 进入全屏
        this.addFullScreenStyle();
        this.launchNormalFullscreen(targetElement);
      } else { // 退出全屏
        this.removeFullScreenStyle();
        this.currentTarget = null;
        this.exitNormalFullscreen(targetElement);
      }
      // F11退出全屏时，需要将全屏状态传出去
      const isFullscreen = !!this.doc.fullscreenElement;
      this.fullscreenLaunch.emit({
        isFullscreen
      });
      this.isFullscreen = isFullscreen;
    }
  }

  private handleFullscreen = async () => {
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
      if (this.doc.fullscreenElement) {
        isFullscreen = await this.exitImmersiveFullScreen(this.doc);
      } else {
        isFullscreen = await this.launchImmersiveFullScreen(this.doc.documentElement);
      }
    }

    this.isFullscreen = isFullscreen;
    this.fullscreenLaunch.emit({
      isFullscreen
    });
  }

  private handleKeyDown = (event) => {
    if (event.keyCode === ESC_KEYCODE) { // 按ESC键退出全屏
      if (this.isFullscreen) {
        const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
        if (this.mode === 'normal') {
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
  }

  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.onFullScreenChange);
    document.removeEventListener('keydown', this.handleKeyDown);
    const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
    if (btnLaunch) { btnLaunch.removeEventListener('click', this.handleFullscreen); }
  }

  private addFullScreenStyle() {
    document.getElementsByTagName('html')[0].classList.add('devui-fullscreen');
  }

  private removeFullScreenStyle() {
    document.getElementsByTagName('html')[0].classList.remove('devui-fullscreen');
  }
}
