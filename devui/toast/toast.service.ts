import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {

    public static zindex = 1060;

    public fadeIn(element, duration: number): void {
        element.style.opacity = 0;

        let last = +new Date();
        let opacity = 0;
        const tick = function () {
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();

            if (+opacity < 1) {
              if (window.requestAnimationFrame) {
                requestAnimationFrame(tick);
              } else {
                setTimeout(tick, 16);
              }
            }
        };

        tick();
    }

    public fadeOut(element, ms) {
        let opacity = 1;
        const interval = 50;
        const duration = ms;
        const gap = interval / duration;

        const fading = setInterval(() => {
            opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }

            element.style.opacity = opacity;
        }, interval);
    }
}
