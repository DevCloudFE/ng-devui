import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';
const easeIn = AnimationCurves.EASE_IN;
const easeOut = AnimationCurves.EASE_OUT;
const duration = AnimationDuration.SLOW;

export const flyInOut: AnimationTriggerMetadata = trigger('flyInOut', [
  state('left-void', style({ transform: 'translateX(-100%)', opacity: 0 })),
  state('left-in', style({ transform: 'translateX(0)', opacity: 1 })),
  state('right-void', style({ transform: 'translateX(100%)', opacity: 0.8 })),
  state('right-in', style({ transform: 'translateX(0)', opacity: 1 })),
  // 解决初始化动效为'void'而非'left/right-void'
  transition('void => left-in', [
    style({ transform: 'translateX(-100%)', opacity: 0.8 }),
    animate(`${duration} ${easeOut}`, style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition('void => right-in', [
    style({ transform: 'translateX(100%)', opacity: 0.8 }),
    animate(`${duration} ${easeOut}`, style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition('left-void => left-in', [animate(`${duration} ${easeOut}`)]),
  transition('right-void => right-in', [animate(`${duration} ${easeOut}`)]),
  transition('left-in => left-void', [animate(`${duration} ${easeIn}`)]),
  transition('right-in => right-void', [animate(`${duration} ${easeIn}`)]),
]);
