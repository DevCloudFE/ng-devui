import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('void', style({transform: 'scaleY(0)', opacity: 0, transformOrigin: '50% 0% 0px', display: 'block'})),
  state('bottom', style({transform: 'scaleY(0.9999)',  opacity: 1, transformOrigin: '50% 0% 0px', display: 'block'})),
  state('top', style({transform: 'scaleY(0.9999)', opacity: 1, transformOrigin: '0% 100%', display: 'block'})),
  transition('void => bottom', [
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)')
  ]),
  transition('bottom => void', [
    animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
  ]),
  transition('void => top', [
    style({transform: 'scaleY(0)', opacity: 0, transformOrigin: '0% 100%', display: 'block'}),
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)')]),
  transition('top => void', [
    animate('150ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    style({transform: 'scaleY(0)', opacity: 0, transformOrigin: '0% 100%', display: 'block'}))
  ])]);
