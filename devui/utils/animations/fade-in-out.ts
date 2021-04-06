import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const easeInQuint = 'cubic-bezier(0.5, 0, 0.84, 0.25)';
export const easeOutQuint = 'cubic-bezier(0.16, 0.75, 0.5, 1)';
export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('void', style({transform: 'scaleY(0) translateY(-4px)', opacity: 0, transformOrigin: '0 0%', display: 'block'})),
  state('bottom', style({transform: 'scaleY(0.9999) translateY(0)',  opacity: 1, transformOrigin: '0 0%', display: 'block'})),
  state('top', style({transform: 'scaleY(0.9999) translateY(0)', opacity: 1, transformOrigin: '0 100%', display: 'block'})),
  transition('void => bottom', [
    style({opacity: 0.8, transform: 'scaleY(0.8) translateY(-4px)'}),
    animate(`200ms ${easeOutQuint}`)
  ]),
  transition('bottom => void', [
    animate(`200ms ${easeInQuint}`,
      style({transform: 'scaleY(0.8) translateY(-4px)', opacity: 0, transformOrigin: '0 0%', display: 'none'})),
  ]),
  transition('void => top', [
    style({transform: 'scaleY(0.8) translateY(4px)', opacity: 0.8, transformOrigin: '0 100%', display: 'block'}),
    animate(`160ms ${easeOutQuint}`)]),
  transition('top => void', [
    animate(`160ms ${easeInQuint}`,
    style({transform: 'scaleY(0.8) translateY(4px)', opacity: 0, transformOrigin: '0 100%', display: 'none'}))
  ])]);
