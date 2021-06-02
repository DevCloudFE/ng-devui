export const QUADRANT_CONFIGS = [];
export const LABEL_SIZE = ['small', 'normal', 'large'];
export const DEFAULT_AXIS_CONFIGS = {
    tickWidth: 10,
    spaceBetweenLabelsAxis: 20,
    xAxisLabel: '紧急度',
    yAxisLabel: '重要度',
    xAxisRange: {
        min: 0,
        max: 100,
        step: 10
    },
    yAxisRange: {
        min: 0,
        max: 50,
        step: 5
    },
    originPosition: {
        left: 30,
        bottom: 30
    },
    axisMargin: 35,
    xWeight: 1,
    yWeight: 1
};
export const DEFAULT_QUADRANT_CONFIGS = [
    { title: '重要紧急' },
    { title: '重要不紧急' },
    { title: '不重要不紧急' },
    { title: '不重要紧急' }
];
export const AXIS_TITLE_SPACE = 15;
export const SMALL_LABEL_SIZE_CENTER_POINT = {
    x: 6, y: 6
};
export const NORMAL_LABEL_SIZE_CENTER_POINT = {
    x: 45, y: 14
};
export const LARGE_LABEL_SIZE_CENTER_POINT = {
    x: 60, y: 18
};
