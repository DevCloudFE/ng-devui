import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const EaseInOut = 'cubic-bezier(0.5, 0.05, 0.5, 0.95)';
export const collapse: AnimationTriggerMetadata = trigger('collapse', [
    state('expanded', style({ opacity: 1, height: '*', overflow: 'hidden' })),
    state('collapsed', style({ opacity: 0, height: 0, overflow: 'hidden'})),
    transition('collapsed => expanded', animate(`300ms ${EaseInOut}`)),
    transition('expanded => collapsed', animate(`300ms ${EaseInOut}`))
]);

export const collapseForDomDestroy: AnimationTriggerMetadata = trigger('collapseForDomDestroy', [
    state('expanded', style({ opacity: 1, height: '*', overflow: 'hidden' })),
    state('void', style({ opacity: 0, height: 0, overflow: 'hidden'})),
    transition('void => expanded', animate(`300ms ${EaseInOut}`)),
    transition('expanded => void', animate(`300ms ${EaseInOut}`))
]);
