import { animate, AnimationTriggerMetadata, group, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';

const easeOut = AnimationCurves.EASE_OUT;
const easeIn = AnimationCurves.EASE_IN;
const linear = AnimationCurves.LINEAR;
const duration = AnimationDuration.FAST;

export const wipeInOutAnimation: AnimationTriggerMetadata = trigger('wipeInOutAnimation', [
  state('void', style({ opacity: 0.2, transform: 'translateY(-24px)' })),
  state('in', style({ opacity: 1, transform: 'unset' })),
  transition('void => in', group([
    animate(`${duration} ${easeOut}`, style({ opacity: 1 })),
    animate(`${duration} ${linear}`, style({ transform: 'unset' }))
  ])),
  transition('in => void', group([
    animate(`${duration} ${easeIn}`, style({ opacity: 0.2 })),
    animate(`${duration} ${linear}`, style({ transform: 'translateY(-24px)' }))
  ])),
]);
