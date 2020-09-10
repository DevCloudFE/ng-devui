export const ICON_EXPAND = `<svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1"
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1482.000000, -1285.000000)" fill="#293040" fill-rule="nonzero">
            <g  transform="translate(1481.000000, 1284.000000)">
                <path d="M15,1 L15,6 L13,6 L13,3 L10,3 L10,1 L15,1 Z M15,10 L15,15 L10,15 L10,13 L13,13 L13,10 L15,10
                Z M1,15 L1,10 L3,10 L3,13 L6,13 L6,15 L1,15 Z M1,1 L6,1 L6,3 L3,3 L3,6 L1,6 L1,1 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </g>
</svg>`;
export const ICON_CONTRACT = `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M10,6 L10,1 L12,1 L12,4 L15,4 L15,6 L10,6 Z M6,1 L6,6 L1,6 L1,4 L4,4 L4,1 L6,1 Z M10,15 L10,10 L15,10 L15,12
        L12,12 L12,15 L10,15 Z M6,10 L6,15 L4,15 L4,12 L1,12 L1,10 L6,10 Z" id="形状" fill="#293040" fill-rule="nonzero"></path>
    </g>
</svg>`;
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
