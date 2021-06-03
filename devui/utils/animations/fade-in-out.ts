import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';

const easeIn = AnimationCurves.EASE_IN;
const easeOut = AnimationCurves.EASE_OUT;
const duration = AnimationDuration.BASE;
export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('void', style({ transform: 'scaleY(0) translateY(-4px)', opacity: 0, transformOrigin: '0 0%', display: 'block' })),
  state('bottom', style({ transform: 'scaleY(0.9999) translateY(0)', opacity: 1, transformOrigin: '0 0%', display: 'block' })),
  state('top', style({ transform: 'scaleY(0.9999) translateY(0)', opacity: 1, transformOrigin: '0 100%', display: 'block' })),
  transition('void => bottom', [
    style({ opacity: 0.8, transform: 'scaleY(0.8) translateY(-4px)' }),
    animate(`${duration} ${easeOut}`)
  ]),
  transition('bottom => void', [
    animate(`${duration} ${easeIn}`,
      style({ transform: 'scaleY(0.8) translateY(-4px)', opacity: 0, transformOrigin: '0 0%', display: 'none' })),
  ]),
  transition('void => top', [
    style({ transform: 'scaleY(0.8) translateY(4px)', opacity: 0.8, transformOrigin: '0 100%', display: 'block' }),
    animate(`${duration} ${easeOut}`)]),
  transition('top => void', [
    animate(`${duration} ${easeIn}`,
      style({ transform: 'scaleY(0.8) translateY(4px)', opacity: 0, transformOrigin: '0 100%', display: 'none' }))
  ])]);
