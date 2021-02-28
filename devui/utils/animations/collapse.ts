import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const collapseMotion: AnimationTriggerMetadata = trigger('collapseState', [
    state('expanded', style({ opacity: 1, height: '*', overflow: 'hidden' })),
    state('collapsed', style({ opacity: 0, height: 0, overflow: 'hidden'})),
    transition('collapsed => expanded', animate('300ms ease-in-out')),
    transition('expanded => collapsed', animate('300ms ease-in-out'))
]);

export const treeCollapseMotion: AnimationTriggerMetadata = trigger('treeCollapseState', [
  state('*', style({ opacity: 1, height: '*', overflow: 'hidden' })),
  state('void', style({ opacity: 0, height: 0, overflow: 'hidden'})),
  transition('void => *', animate('300ms ease-in-out')),
  transition('* => void', animate('300ms ease-in-out'))
]);
