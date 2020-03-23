import { TreeUtils } from 'ng-devui/utils';

export class TreeMaskService {

  public static creatMaskElement() {
    const maskElement = document.createElement('span');
    const style = {
      display: 'none',
      position: 'absolute',
      top: '0',
      right: '0',
      'z-index': '-1' // 设置z-index防止挡住tree
    };
    maskElement.classList.add('devui-tree-mask');
    TreeUtils.addElStyles(maskElement, style);
    return maskElement;
  }

  public static addMask(hostElement: any, maskElement: any, treeWidth: number) {
    event.stopPropagation();
    if (treeWidth) {
      const nodeHeight = hostElement.clientHeight;
      maskElement.style.width = treeWidth + 'px';
      maskElement.style.height = nodeHeight + 'px';
      maskElement.style.display = 'block';
      hostElement.appendChild(maskElement);
    }
  }

  public static removeMask(hostElement: any, maskElement: any) {
    maskElement.style.display = 'none';
    hostElement.removeChild(maskElement);
  }

  public static calcWidth(treeNode: any, index?: number) {
    let treeWidth;
    // 若传入的有width说明是nativeElement则直接设置宽度，若有Length说明是queryList则找子元素宽度
    if (treeNode.clientWidth) {
      treeWidth = treeNode.clientWidth;
    } else if (treeNode.length) {
      const nodeList = treeNode['_results'];
      if (index >= 0) { // 若index小于0则必定不合法，NaN和undefined都不大于0
        treeWidth = nodeList[index].nativeElement.clientWidth;
      } else { // index不合法的和没传的都找子element里最大的
        treeWidth = Math.max(...nodeList.map(node => node.nativeElement.clientWidth));
      }
    }
    return treeWidth;
  }
}
