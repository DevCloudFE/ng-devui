import { animate, animateChild, AnimationTriggerMetadata, query, state, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animationParameters';

const easeInOut = AnimationCurves.EASE_IN_OUT;
const duration = AnimationDuration.SLOW;

export const expandCollapse: AnimationTriggerMetadata = trigger('collapse', [
  state('expanded', style({ opacity: 1, height: '*', overflow: 'hidden' })),
  state('collapsed', style({ opacity: 0, height: 0, overflow: 'hidden' })),
  transition('collapsed => expanded', animate(`${duration} ${easeInOut}`)),
  transition('expanded => collapsed', animate(`${duration} ${easeInOut}`))
]);

export const expandCollapseForDomDestroy: AnimationTriggerMetadata = trigger('collapseForDomDestroy', [
  transition(':enter', [
    style({ opacity: 0, height: 0, overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 1, height: '*', overflow: 'hidden' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*', overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 0, height: 0, overflow: 'hidden' })),
  ]),
]);

/*
todo: 可作成函数指定selector eg: '.devui-sub-menu-children'
@collapseForDomDestroyWithChildren
bug:
当前是展开的情况下，
如果收起父级，再展开父级
此时再次点击当前菜单收起是不带动画的
*/
export const expandCollapseForDomDestroyWithChildren: AnimationTriggerMetadata = trigger('collapseForDomDestroyWithChildren', [
  transition(':enter', [
    style({ opacity: 0, height: 0, overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 1, height: '*', overflow: 'hidden' })),
    query('@collapseForDomDestroyWithChildren', animateChild({
      delay: duration
    }), { optional: true })
  ]),
  transition(':leave', [
    style({ opacity: 1, height: '*', overflow: 'hidden' }),
    animate(`${duration} ${easeInOut}`, style({ opacity: 0, height: 0, overflow: 'hidden' })),
    query('@collapseForDomDestroyWithChildren', animateChild({
      delay: duration
    }), { optional: true })
  ]),
]);


export const collapseMotion: AnimationTriggerMetadata = trigger('collapseMotion', [
  state('expanded', style({ height: '*' })),
  state('collapsed', style({ height: 0 })), // overflow: 'hidden'
  transition('expanded => collapsed', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
  transition('collapsed => expanded', animate(`150ms ${AnimationCurves.EASE_IN_OUT}`)),
]);
