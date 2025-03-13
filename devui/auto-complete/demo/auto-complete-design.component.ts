import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'd-auto-complete-design',
    templateUrl: './auto-complete-design.component.html',
    standalone: false
})

export class AutoCompleteDesignComponent implements OnInit {
  designObj;
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subs.add(
      this.translate.get('components.auto-complete.design').subscribe((res) => {
        this.designObj = res;
      })
    );
  }
  getImgSrc(src) {
    return environment.deployPrefix + src;
  }
}
