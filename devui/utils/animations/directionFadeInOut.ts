import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const directionFadeInOut: AnimationTriggerMetadata = trigger('directionFadeInOut', [
  state('void', style({opacity: 0})),
  state('visible', style({opacity: 1})),
  state('bottom', style({opacity: 1})),
  state('top', style({opacity: 1})),
  state('left', style({opacity: 1})),
  state('right', style({opacity: 1})),
  transition('* => bottom', [
    style({transform: 'translateY(-5px)', opacity: 0, pointerEvents: 'none'}),
    animate('.3s cubic-bezier(0.23, 1, 0.32, 1)', style({transform: 'translateY(0)', opacity: 1}))
  ]),
  transition('bottom => void', [
    style({transform: 'translateY(0)', opacity: 1}),
    animate('.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({transform: 'translateY(-5px)', opacity: 0}))
  ]),
  transition('* => top', [
    style({transform: 'translateY(5px)', opacity: 0, pointerEvents: 'none'}),
    animate('.3s cubic-bezier(0.23, 1, 0.32, 1)', style({transform: 'translateY(0)', opacity: 1}))
  ]),
  transition('top => void', [
    style({transform: 'translateY(0)', opacity: 1}),
    animate('.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({transform: 'translateY(5px)', opacity: 0}))
  ]),
  transition('* => left', [
    style({transform: 'translateX(5px)', opacity: 0, pointerEvents: 'none'}),
    animate('.3s cubic-bezier(0.23, 1, 0.32, 1)', style({transform: 'translateX(0)', opacity: 1}))
  ]),
  transition('left => void', [
    style({transform: 'translateX(0)', opacity: 1}),
    animate('.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({transform: 'translateX(5px)', opacity: 0}))
  ]),
  transition('* => right', [
    style({transform: 'translateX(-5px)', opacity: 0, pointerEvents: 'none'}),
    animate('.3s cubic-bezier(0.23, 1, 0.32, 1)', style({transform: 'translateX(0)', opacity: 1}))
  ]),
  transition('right => void', [
    style({transform: 'translateX(0)', opacity: 1}),
    animate('.3s cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({transform: 'translateX(-5px)', opacity: 0}))
  ]),
  transition('void => visible', animate('.15s cubic-bezier(0.0, 0.0, 0.2, 1)')),
  transition('visible => void', animate('.15s cubic-bezier(0.0, 0.0, 0.2, 1)'))
]);
