import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BreadCrumbService {
    constructor(private router: Router) { }
    // 与原生routerLink表现形式一致，navigateByUrl()可直接传入字符串类型的链接，并将链接解析为routerLink的urlTree的形式
    navigateTo($event, item) {
        // 兼容a标签与不同键的交互形式
        if ($event.button !== 0 || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
            return;
        }
        if (typeof item.target === 'string' && item.target !== '_self') {
            return;
        }
        $event.preventDefault();
        this.router.navigateByUrl(item.link);
    }

}
