<h1 align="center">vite-plugin-vue-svg</h1>
<p align="center">Extend Vite with ability to use SVG files as Vue components.</p>

### Features:
- [SVGO](https://github.com/svg/svgo) optimization
- Hot Module Replacement support
- Support for `?url` and `?component` query string

#### Currently supported Vite version:

<p><code>2.0.0-beta.61</code></p>

### Install

```bash
yarn add --dev vite-plugin-vue-svg @vue/compiler-sfc

npm i -D vite-plugin-vue-svg @vue/compiler-sfc
```

### Setup

```js
// vite.config.js
const vue = require('@vitejs/plugin-vue');
const vueSvgPlugin = require('vite-plugin-vue-svg');

module.exports = {
  plugins: [
    vue(),
    vueSvgPlugin(),
  ],
};
```

#### Options

```js
vueSvgPlugin({
  // Default behavior when importing `.svg` files, possible options are: 'url' and `component`
  defaultExport: 'url',

  // SVGO configuration object
  svgoConfig: {},
})
```

### Usage

```vue
<template>
  <div>
    <MyIcon />
  </div>
</template>
<script>
import MyIcon from './svgs/my-icon.svg?component';

export default {
  components: {
    MyIcon,
  },
};
</script>
```
