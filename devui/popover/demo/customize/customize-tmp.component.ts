import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ave-customize-tmp',
  templateUrl: './customize-tmp.component.html',
  styleUrls: ['./customize-tmp.component.css']
})
export class CustomizeTmpComponent implements OnInit {
  content = this.domSanitizer.bypassSecurityTrustHtml(
    '<p>自定义提示，带链接</p><a href="http://www.baidu.com" style="text-decoration:underline;color:#5170FF">学习更多</a>'
    );
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
