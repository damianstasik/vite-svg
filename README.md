<h1 align="center">vite-plugin-svg</h1>
<p align="center">Extend Vite with ability to use SVG files as Vue components.</p>

### Features:
- [SVGO](https://github.com/svg/svgo) optimization
- Hot Module Replacement support
- Default SVG import behavior support

#### Currently supported Vite version:

<p><code>1.0.0-rc.4</code></p>

### Install

```bash
yarn add --dev vite-plugin-svg

npm i -D vite-plugin-svg
```

### Usage

Starting from `v0.4.0` to use SVG file as a component, just import `VueComponent` from the path of the file.
This gives you more control over how a particular SVG file should be loaded and processed:

```js
// Get URL to SVG file
import myIconUrl from './svgs/my-icon.svg';

const img = document.createElement('img');
img.src = myIconUrl;
```
```css
.my-icon {
  /* Get URL to SVG file */
  background-image: url("./svgs/my-icon.svg");
}
```
```vue
<template>
  <div>
    <MyIcon />
  </div>
</template>
<script>
import { VueComponent as MyIcon } from './svgs/my-icon.svg';

export default {
  components: {
    MyIcon,
  },
};
</script>
```

### Setup

#### `vite.config.js`

```js
const svgPlugin = require('vite-plugin-svg');

module.exports = {
  plugins: [
    svgPlugin(),
  ],
};
```

### TODO:
- Convert plugin to TS
- Support disabling SVGO
- Basic test coverage
