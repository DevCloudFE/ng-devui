import {
  Component,
  Renderer2,
  OnInit,
  ElementRef,
  Input,
  TemplateRef,
} from '@angular/core';


@Component({
  selector: 'd-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
  @Input() extraInfo: string | TemplateRef<any>;
  get extraInfoTemplate() {
    return this.extraInfo instanceof TemplateRef ? this.extraInfo : null;
  }
  constructor(elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'devui-form-controls');
  }

  ngOnInit() {

  }
}
