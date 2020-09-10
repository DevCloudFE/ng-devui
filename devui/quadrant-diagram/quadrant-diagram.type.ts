export interface IAxisConfigs {
    tickWidth?: number; // 刻度的宽(高)度，默认为10
    spaceBetweenLabelsAxis?: number; // 刻度值和坐标轴之间的距离，默认为20
    axisMargin?: number; // 右侧留出的空白区域
    xAxisLabel?: string; // X轴名称，默认值为'紧急度'
    yAxisLabel?: string; // Y轴名称，默认值为'重要度'
    xWeight?: number; // X轴权重，默认值为1
    yWeight?: number; // Y轴权重，默认值为1
    xAxisRange?: IRangeConfigs; // X轴的坐标值范围和间距设置,默认值为{min:0,max:100,step:10}
    yAxisRange?: IRangeConfigs; // Y轴的坐标值范围和间距设置,默认值为{min:0,max:100,step:10}
    originPosition?: {
        left: number;
        bottom: number;
    }; // 原点的位置设置，默认值为{left:30,bottom:30}
    [propName: string]: any;
}
export interface IQuadrantConfigs {
    backgroundColor?: any;
    color?: any;
    title?: string;
    top?: number;
    left?: number;
}
export interface ILabelDataConfigs {
    x: number; // X轴坐标值
    y: number; // Y轴坐标值
    title: string; // 标签的名称
    content?: string; // 鼠标悬浮在标签上时的提示内容
    progress?: number; // 标签对应事项的进度
    [propName: string]: any; // 其他数据
}

export interface IViewConfigs {
    height: number; // 象限图高度
    width: number; // 象限图宽度
}

export interface IRangeConfigs {
    min: number; // 坐标轴起始值
    max: number; // 坐标轴终止值
    step: number; // 坐标轴刻度值的间隔
}

export type labelSize = 'small' | 'normal' | 'large';
