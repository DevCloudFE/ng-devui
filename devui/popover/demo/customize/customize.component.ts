import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
})
export class CustomizeTmpComponent implements OnInit {
  content = this.domSanitizer.bypassSecurityTrustHtml(
    `<p>自定义提示，带链接</p>
     <p><a class="devui-link" href="https://devui.design" target="_blank">学习更多</a></p>
     <p><a class="devui-link-light" href="https://devui.design" target="_blank">学习更多</a></p>`
    );
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
