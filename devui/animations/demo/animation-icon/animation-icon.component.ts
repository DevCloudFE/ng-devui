import { Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'd-animation-icon',
    templateUrl: './animation-icon.component.html',
    styleUrls: ['./animation-icon.component.scss'],
    standalone: false
})
export class AnimationIconComponent {

  angle = 0;
  startDiffusion = false;

  constructor(
    private render: Renderer2
  ) {
  }

  rotate(ele) {
    this.angle += 90;
    this.render.setStyle(ele, 'transform', `rotate(${this.angle}deg)`);
  }

  diffusion() {
    this.startDiffusion = true;

    setTimeout(() => {
      this.startDiffusion = false;
    }, 400);
  }
}
