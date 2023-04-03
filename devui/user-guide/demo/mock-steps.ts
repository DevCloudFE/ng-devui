import { IStep } from 'ng-devui/user-guide';
export const mockSteps: Array<IStep> = [
  {
    title: '快速开始',
    desc: '快速指引',
    showDots: false,
    onExit: () => console.log('exit'),
    detail: [
      {
        title: '欢迎使用用户指引组件UserGuide！',
        content: '若步骤不传入element则不定位到具体元素进行整体的信息展示~'
      },
      {
        element: '.header-logo',
        content: '此为一般指引模式，定位到元素并视觉突出当前步骤进行展示，页面及元素不可点击',
        type: 'normal',
        highlightOffset: [4,4,4,4],
        beforeChange: () => {
          console.log('beforeChange');
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            });
          });
        }
      },
      {
        element: '.demo-textinput',
        title: '请输入内容',
        type: 'interactable',
        eventType: 'inputable',
        inputData: 'master',
        highlightOffset: [4,4,4,4],
      },
      {
        element: '.clickable-event',
        content: '当前步骤为可交互模式中的可点击事件，点击试一下！',
        type: 'interactable',
        eventType: 'clickable',
        highlightOffset: [4,4,4,4],
      },
      {
        element: '.modal-content',
        title: '点击完成退出教程',
        showPrevButton: false,
        highlightOffset: [4,4,4,4],
      },
    ]
  },
  {
    title: '主题指引',
    desc: '教你怎么切换主题',
    detail: [
      {
        element: '.theme-toggle',
        title: '点击按钮打开主题面板',
        type: 'interactable',
        eventType: 'clickable',
        highlightOffset: [4,4,4,4],
      },
      {
        element: '.theme-menu',
        title: '点击一个主题试一下',
        type: 'interactable',
        eventType: 'exit',
        highlightOffset: [4,4,4,4],
      }
    ]
  },
  {
    title: '单步指引',
    desc: '单步指引',
    onExit: () => console.log('exit'),
    detail: [
      {
        element: 'api',
        title: '点击此处查看API',
        position: 'top',
        type: 'tip'
      }
    ]
  }
];
