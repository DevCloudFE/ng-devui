import { animate, AnimationTriggerMetadata, group, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';
const duration = AnimationDuration.FAST;
const linear = AnimationCurves.LINEAR;

export const backdropFadeInOut: AnimationTriggerMetadata = trigger('backdropAnimation', [
  state('void', style({ display: 'none', opacity: 0 })),
  state('in', style({ display: 'block', opacity: 1 })),
  transition('void => in', [
    style({ display: 'block' }),
    animate(`${duration} ${linear}`, style({ opacity: 1 }))
  ]),
  transition('in => void', group([
    animate(`${duration} ${linear}`, style({ opacity: 0 }))
  ])),
]);
