import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html',
})
export class CustomizeTmpComponent implements OnInit {
  content = this.domSanitizer.bypassSecurityTrustHtml(
    '<p>自定义提示，带链接</p><a href="https://devui.design" target="_blank" style="text-decoration:none;color:#7693F5">学习更多</a>'
    );
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
