import converters from './converters';
const getRegExp = (units) => new RegExp('\\b' + units + '\\(([^()]+)\\)', 'g');
const emRegExp = getRegExp('em');
const remRegExp = getRegExp('rem');
const plugin = () => {
    return {
        postcssPlugin: 'postcss-rem-em',
        Once(root) {
            root.replaceValues(remRegExp, { fast: `rem(` }, (_, values) => converters.rem(values));
            root.replaceValues(emRegExp, { fast: `em(` }, (_, values) => converters.em(values));
        },
        AtRule: {
            media: (atRule) => {
                atRule.params = atRule.params
                    .replace(remRegExp, (value) => converters.remNoScale(value.replace(/rem\((.*?)\)/g, '$1')))
                    .replace(emRegExp, (value) => converters.em(value.replace(/em\((.*?)\)/g, '$1')));
            },
            container: (atRule) => {
                atRule.params = atRule.params
                    .replace(remRegExp, (value) => converters.remNoScale(value.replace(/rem\((.*?)\)/g, '$1')))
                    .replace(emRegExp, (value) => converters.em(value.replace(/em\((.*?)\)/g, '$1')));
            }
        }
    };
};
plugin.postcss = true;
export default plugin;
