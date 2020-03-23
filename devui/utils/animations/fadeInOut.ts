import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('void', style({transform: 'perspective(1px) scaleY(0)', opacity: 0, transformOrigin: '0% 0%', display: 'block'})),
  state('bottom', style({transform: 'perspective(1px) scaleY(1)', opacity: 1, transformOrigin: '0% 0%', display: 'block'})),
  state('top', style({transform: 'perspective(1px) scaleY(1)', opacity: 1, transformOrigin: '0% 100%', display: 'block'})),
  transition('void => bottom', [
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)')]),
  transition('bottom => void', [
    animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')]),
  transition('void => top', [
    style({transform: 'perspective(1px) scaleY(0)', opacity: 0, transformOrigin: '0% 100%', display: 'block'}),
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)')]),
  transition('top => void', animate('150ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    style({transform: 'perspective(1px) scaleY(0)', opacity: 0, transformOrigin: '0% 100%', display: 'block'}))
  )]);
