import { Declaration } from 'postcss'
import unisConverters from './converters'

const rem = unisConverters.remStrict

const plugin = () => {
  return {
    postcssPlugin: 'postcss-auto-rem',
    Declaration: (decl: Declaration) => {
      if (!decl.value.includes('px')) {
        return
      }

      if (decl.prop === 'content') {
        return
      }

      decl.value = rem(decl.value)
    }
  }
}

plugin.postcss = true

export default plugin
