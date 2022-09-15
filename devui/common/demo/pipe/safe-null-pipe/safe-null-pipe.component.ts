import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-safe-null-pipe',
  templateUrl: './safe-null-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeNullPipeComponent implements OnInit {
  name = '';
  age = void 0;
  address = null;

  constructor() {}

  ngOnInit(): void {}
}
