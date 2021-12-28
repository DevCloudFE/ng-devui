import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

/**
 * @deprecated
 */
export const cornerFadeInOut: AnimationTriggerMetadata = trigger('cornerFadeInOut', [
  transition('void => bottom', [
    style({transform: 'scale(0.9)', opacity: 0, transformOrigin: '0% 0%', display: 'inline-block'}),
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)',
      style({transform: 'scale(1)', opacity: 1, transformOrigin: '0% 0%'})),
  ]),
  transition('bottom => void', [
    style({transform: 'scale(1)', opacity: 1, transformOrigin: '0% 0%', display: 'inline-block'}),
    animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      style({transform: 'scale(0.9)', opacity: 0, transformOrigin: '0% 0%'}))
  ]),
  transition('void => top', [
    style({transform: 'scale(0.9)', opacity: 0, transformOrigin: '0% 100%', display: 'inline-block'}),
    animate('200ms cubic-bezier(0.23, 1, 0.32, 1)',
      style({transform: 'scale(1)', opacity: 1, transformOrigin: '0% 100%'})),
  ]),
  transition('top => void', [
    style({transform: 'scale(1)', opacity: 1, transformOrigin: '0% 100%', display: 'inline-block'}),
    animate('200ms cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      style({transform: 'scale(0.9)', opacity: 0, transformOrigin: '0% 100%'}))
  ]
  )
]);
