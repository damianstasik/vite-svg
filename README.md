# vite-plugin-svg

## Extend Vite with ability to use SVG files as Vue components.

### Current state:
POC (please read release notes before updating)

Vite is currently in an experimental state which means this plugin will change accordingly until the plugin API is established and frozen.

### Install

```bash
yarn add vite-plugin-svg @vue/compiler-dom
```

### Usage

To use SVG file as a Vue component you need to append `?component` query string to the path of your file.
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
import MyIcon from './svgs/my-icon.svg?component'; // Note the `?component` part

export default {
  components: {
    MyIcon,
  },
};
</script>
```

### Setup

#### `dev.js`

```js
const { createServer } = require('vite');
const { getDevSvgPlugin } = require('vite-plugin-svg');

createServer({
  plugins: [
    getDevSvgPlugin(),
  ],
}).listen(3000);
```

#### `build.js`

```js
const { build } = require('vite');
const { getBuildSvgPlugin } = require('vite-plugin-svg');

(async () => {
  await build({
    rollupInputOptions: {
      plugins: [getBuildSvgPlugin()],
    },
  });
})();
```
