import nested from 'postcss-nested';
import mixins from 'postcss-mixins';
import remEm from './postcss-rem-em';
import colorMixAlpha from './postcss-color-mix';
import lightDark from './postcss-light-dark';
import converters from './converters';
import autorem from './auto-rem';
function colorSchemeMixin(colorScheme, type = 'default') {
    if (type === 'where') {
        return {
            [`:where([data-c-color-scheme='${colorScheme}']) &`]: {
                '@mixin-content': {}
            }
        };
    }
    return {
        [`[data-c-color-scheme='${colorScheme}'] &`]: {
            '@mixin-content': {}
        }
    };
}
function rootColorSchemeMixin(colorScheme, type = 'default') {
    if (type === 'where') {
        return {
            [`&:where(:root[data-c-color-scheme='${colorScheme}'])`]: {
                '@mixin-content': {}
            }
        };
    }
    return {
        [`&[data-c-color-scheme='${colorScheme}']`]: {
            '@mixin-content': {}
        }
    };
}
const hoverMixin = {
    '@media (hover: hover)': {
        '&:hover': {
            '@mixin-content': {}
        }
    },
    '@media (hover: none)': {
        '&:active': {
            '@mixin-content': {}
        }
    }
};
const hoverWhereMixin = {
    '@media (hover: hover)': {
        '&:where(:hover)': {
            '@mixin-content': {}
        }
    },
    '@media (hover: none)': {
        '&:where(:active)': {
            '@mixin-content': {}
        }
    }
};
const rtlMixin = {
    '[dir="rtl"] &': {
        '@mixin-content': {}
    }
};
const ltrMixin = {
    '[dir="ltr"] &': {
        '@mixin-content': {}
    }
};
const notRtlMixin = {
    ':root:not([dir="rtl"]) &': {
        '@mixin-content': {}
    }
};
const notLtrMixin = {
    ':root:not([dir="ltr"]) &': {
        '@mixin-content': {}
    }
};
const rtlWhereMixin = {
    ':where([dir="rtl"]) &': {
        '@mixin-content': {}
    }
};
const ltrWhereMixin = {
    ':where([dir="ltr"]) &': {
        '@mixin-content': {}
    }
};
const notRtlWhereMixin = {
    ':where(:not([dir="rtl"])) &': {
        '@mixin-content': {}
    }
};
const notLtrWhereMixin = {
    ':where(:not([dir="ltr"])) &': {
        '@mixin-content': {}
    }
};
const smallerThanMixin = (_mixin, breakpoint) => ({
    [`@media (max-width: ${converters.em(converters.px(breakpoint) - 0.1)})`]: {
        '@mixin-content': {}
    }
});
const largerThanMixin = (_mixin, breakpoint) => ({
    [`@media (min-width: ${converters.em(breakpoint)})`]: {
        '@mixin-content': {}
    }
});
const defaultFeatures = {
    lightDarkFunction: true,
    nested: true,
    colorMixAlpha: true,
    remEmFunctions: true,
    mixins: true
};
const plugin = (options = {}) => {
    const features = {
        ...defaultFeatures,
        ...(options.features || {})
    };
    const plugins = [];
    if (options.autoRem) {
        plugins.push(autorem());
    }
    if (features.lightDarkFunction) {
        plugins.push(lightDark());
    }
    if (features.nested) {
        plugins.push(nested());
    }
    if (features.colorMixAlpha) {
        plugins.push(colorMixAlpha());
    }
    if (features.remEmFunctions) {
        plugins.push(remEm());
    }
    if (features.mixins) {
        plugins.push(mixins({
            mixins: {
                light: colorSchemeMixin('light'),
                dark: colorSchemeMixin('dark'),
                'light-root': rootColorSchemeMixin('light'),
                'dark-root': rootColorSchemeMixin('dark'),
                'where-light': colorSchemeMixin('light', 'where'),
                'where-dark': colorSchemeMixin('dark', 'where'),
                'where-light-root': rootColorSchemeMixin('light', 'where'),
                'where-dark-root': rootColorSchemeMixin('dark', 'where'),
                hover: hoverMixin,
                'where-hover': hoverWhereMixin,
                rtl: rtlMixin,
                ltr: ltrMixin,
                'not-rtl': notRtlMixin,
                'not-ltr': notLtrMixin,
                'where-rtl': rtlWhereMixin,
                'where-ltr': ltrWhereMixin,
                'where-not-rtl': notRtlWhereMixin,
                'where-not-ltr': notLtrWhereMixin,
                'smaller-than': smallerThanMixin,
                'larger-than': largerThanMixin,
                ...(options.mixins || {})
            }
        }));
    }
    return {
        postcssPlugin: 'postcss-preset-cck',
        plugins
    };
};
plugin.postcss = true;
export default plugin;
