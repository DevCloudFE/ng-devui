import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'd-customize',
  templateUrl: './customize.component.html'
})
export class CustomizeTmpComponent implements OnInit {
  content = this.domSanitizer.bypassSecurityTrustHtml(
    `<p>Custom Tips with Links</p>
     <p><a class="devui-link" href="https://devui.design" target="_blank">Learn More</a></p>
     <p><a class="devui-link-light" href="https://devui.design" target="_blank">Learn More</a></p>`
  );
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
