import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-safe-null-pipe',
  templateUrl: './safe-null-pipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeNullPipeComponent {
  name = '';
  gender = void 0;
  age = 18;
  address = null;
}
