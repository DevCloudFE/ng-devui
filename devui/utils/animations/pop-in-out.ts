/**
 * @deprecated
 */
import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

const isIE = typeof window !== 'undefined' && (window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident') > -1);

const ANIMATION = [
  state('void', style({transform: 'scale(0)', transformOrigin: '50% 50%'})),
  state('in', style({transform: 'scale(1)', transformOrigin: '50% 50%'})),
  transition('void => in', [
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)')]),
  transition('in => void', [
    animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')]),
];

if (isIE) {
  ANIMATION.splice(2, 2); // remove last two animation transitions
}

export const popInOut: AnimationTriggerMetadata = trigger('popInOut', ANIMATION);
