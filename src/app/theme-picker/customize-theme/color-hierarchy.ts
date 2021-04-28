export const ColorHierarchyMap = {
    'devui-base-bg': {
        'default-value': '#ffffff'
    },
    'devui-base-bg-dark': {
        'default-value': '#333854'
    },
    'devui-global-bg': {
        'extends': 'devui-base-bg'
    },
    'devui-global-bg-normal': {
        'extends': 'devui-base-bg'
    },
    'devui-brand': {
        'default-value': '#5c7be0',
        'extends': null,
        'dependency': null,
        'offset': null
    },
    'devui-contrast': {
        'default-value': '#c7000a',
    },
    'devui-brand-foil': {
        'extends': 'devui-brand',
    },
    'devui-brand-hover': {
        'extends': 'devui-brand'
    },
    'devui-brand-active': {
        'extends': 'devui-brand'
    },
    'devui-brand-active-focus': {
        'extends': 'devui-brand-active'
    },
    'devui-text': {
        'default-value': '#252b3a'
    },
    'devui-text-weak': {
        'extends': 'devui-text'
    },
    'devui-aide-text': {
        'extends': 'devui-text'
    },
    'devui-aide-text-stress': {
        'extends': 'devui-aide-text'
    },
    'devui-placeholder': {
        'extends': 'devui-text'
    },
    'devui-light-text': {
        'extends': 'devui-text'
    },
    'devui-dark-text': {
        'extends': 'devui-text'
    },
    'devui-link': {
        'extends': 'devui-brand'
    },
    'devui-link-active': {
        'extends': 'devui-link'
    },
    'devui-link-light': {
        'extends': 'devui-link'
    },
    'devui-link-light-active': {
        'extends': 'devui-link-light'
    },
    'devui-line': {
        'default-value': '#adb0b8'
    },
    'devui-dividing-line': {
        'extends': 'devui-line'
    },
    'devui-block': {
        'extends': 'devui-base-bg'
    },
    'devui-area': {
        'extends': 'devui-block'
    },
    'devui-danger': {
        'default-value': '#f66f6a'
    },
    'devui-warning': {
        'default-value': '#fac20a'
    },
    'devui-waiting': {
        'default-value': '#9faad7'
    },
    'devui-success': {
        'default-value': '#50d4ab'
    },
    'devui-info': {
        'default-value': '#5e7ce0'
    },
    'devui-initial': {
        'default-value': '#e9edfa'
    },
    'devui-unavailable': {
        'default-value': '#f5f5f6'
    },
    'devui-shadow': {
        'default-value': 'rgba(0, 0, 0, 0.2)'
    },
    'devui-light-shadow': {
        'extends': 'devui-shadow'
    },
    'devui-icon-text': {
        'extends': 'devui-text'
    },
    'devui-icon-bg': {
        'extends': 'devui-block'
    },
    'devui-icon-fill': {
        'default-value': '#d3d5d9'
    },
    'devui-icon-fill-hover': {
        'extends': 'devui-brand',
        'dependency': 'devui-icon-fill'
    },
    'devui-icon-fill-active': {
        'extends': 'devui-brand'
    },
    'devui-icon-fill-active-hover': {
        'extends': 'devui-icon-fill-active'
    },
    'devui-form-control-line': {
        'extends': 'devui-line'
    },
    'devui-form-control-line-hover': {
        'extends': 'devui-form-control-line'
    },
    'devui-form-control-line-active': {
        'extends': 'devui-brand'
    },
    'devui-form-control-line-active-hover': {
        'extends': 'devui-form-control-line-active'
    },
    'devui-list-item-active-bg': {
        'extends': 'devui-brand'
    },
    'devui-list-item-active-text': {
        'extends': 'devui-light-text'
    },
    'devui-list-item-active-hover-bg': {
        'extends': 'devui-list-item-active-bg'
    },
    'devui-list-item-hover-text': {
        'extends': 'devui-brand-active'
    },
    'devui-list-item-hover-bg': {
        'extends': 'devui-brand-active'
    },
    'devui-list-item-selected-bg': {
        'extends': 'devui-brand-active'
    },
    'devui-list-item-strip-bg': {
        'extends': 'devui-brand-active'
    },
    'devui-disabled-bg': {
        'extends': 'devui-base-bg'
    },
    'devui-disabled-line': {
        'extends': 'devui-base-bg',
        'dependency': 'devui-brand'
    },
    'devui-disabled-text': {
        'extends': 'devui-light-text',
        'dependency': 'devui-brand'
    },
    'devui-primary-disabled': {
        'extends': 'devui-primary'
    },
    'devui-icon-fill-active-disabled': {
        'extends': 'devui-icon-fill-active'
    },
    'devui-label-bg': {
        'extends': 'devui-base-bg',
        'dependency': 'devui-brand'
    },
    'devui-connected-overlay-bg': {
        'extends': 'devui-base-bg'
    },
    'devui-connected-overlay-line': {
        'extends': 'devui-brand'
    },
    'devui-fullscreen-overlay-bg': {
        'extends': 'devui-base-bg'
    },
    'devui-feedback-overlay-bg': {
        'default-value': '#464d6e'
    },
    'devui-feedback-overlay-text': {
        'extends': 'devui-light-text'
    },
    'devui-embed-search-bg': {
        'extends': 'devui-base-bg',
        'dependency': 'devui-brand'
    },
    'devui-embed-search-bg-hover': {
        'extends': 'devui-embed-search-bg'
    },
    'devui-float-block-shadow': {
        'extends': 'devui-brand'
    },
    'devui-highlight-overlay': {
        'extends': 'devui-base-bg'
    },
    'devui-range-item-hover-bg': {
        'extends': 'devui-base-bg',
        'dependency': 'devui-brand'
    },
    'devui-primary': {
        'extends': 'devui-brand'
    },
    'devui-primary-hover': {
        'extends': 'devui-primary'
    },
    'devui-primary-active': {
        'extends': 'devui-primary'
    },
    'devui-contrast-hover': {
        'extends': 'devui-contrast'
    },
    'devui-contrast-active': {
        'extends': 'devui-contrast'
    },
    'devui-danger-line': {
        'extends': 'devui-danger'
    },
    'devui-danger-bg': {
        'extends': 'devui-danger'
    },
    'devui-warning-line': {
        'extends': 'devui-warning'
    },
    'devui-warning-bg': {
        'extends': 'devui-warning'
    },
    'devui-info-line': {
        'extends': 'devui-info'
    },
    'devui-info-bg': {
        'extends': 'devui-info'
    },
    'devui-success-line': {
        'extends': 'devui-success'
    },
    'devui-success-bg': {
        'extends': 'devui-success'
    },
    'devui-primary-line': {
        'extends': 'devui-primary'
    },
    'devui-primary-bg': {
        'extends': 'devui-primary'
    },
    'devui-default-line': {
        'extends': 'devui-brand'
    },
    'devui-default-bg': {
        'extends': 'devui-base-bg'
    }
};
