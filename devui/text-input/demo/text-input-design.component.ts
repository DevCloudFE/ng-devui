import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'd-text-input-design',
  templateUrl: './text-input-design.component.html',
})

export class TextInputDesignComponent implements OnInit {
  designObj;
  subs: Subscription = new Subscription();
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subs.add(
      this.translate.get('components.text-input.design').subscribe((res) => {
        this.designObj = res;
      })
    );
  }
  getImgSrc(src) {
    return environment.deployPrefix + src;
  }
}
