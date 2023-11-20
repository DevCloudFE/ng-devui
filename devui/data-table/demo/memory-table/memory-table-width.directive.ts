import { AfterContentInit, Directive, Host, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { DataTableComponent } from 'ng-devui';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[dMemoryTableWidth]'
})
export class MemoryTableWidthDirective implements OnChanges, OnDestroy, AfterContentInit {
  @Input() tableWidthConfig: Array<any>;

  @Input() memoryId: string;

  subscribers = new Subscription();
  constructor(
    @Optional() @Host()
    private hostCmp: DataTableComponent
  ) { }

  /**
   *  使用模板的监听
   */
  ngOnChanges(changes) {
    if (changes.tableWidthConfig) {
      this.update();
    }
  }

  ngAfterContentInit() {
    if (this.hostCmp.columns) {
      this.update();
    }
    this.subscribers.add(this.hostCmp.columns.changes.subscribe(res => {
      setTimeout(() => {
        this.update();
      });
    }));

    this.subscribers.add(this.hostCmp.resize.subscribe(res => {
      localStorage.setItem(this.memoryId, JSON.stringify(this.hostCmp.tableWidthConfig));
    }));
  }


  /**
   * 更新数据
   */
  update() {
    const list = localStorage.getItem(this.memoryId) || '[]';
    // 防止缓存数据被篡改导致报错
    try {
      const memoryColumns = JSON.parse(list);
      if (!this.hostCmp.tableWidthConfig.length) {
        return;
      }
      for (let i = 0; i < (memoryColumns?.length || 0); i++) {
        const target = this.hostCmp.tableWidthConfig.find(t => t.field === memoryColumns[i].field);
        if (target) {
          target.width = memoryColumns[i].width;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    if (this.subscribers) {
      this.subscribers.unsubscribe();
    }
  }

}
