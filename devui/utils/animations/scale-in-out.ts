import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';

const easeIn = AnimationCurves.EASE_IN;
const easeOut = AnimationCurves.EASE_OUT;
const duration = AnimationDuration.FAST;
export const scaleInOut: AnimationTriggerMetadata = trigger('scaleInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(`${duration} ${easeIn}`, style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    // style({ opacity: 1, transform: 'scale(1)' }),
    animate(`${duration} ${easeOut}`, style({ opacity: 0, transform: 'scale(0.8)' })),
  ]),
]);
