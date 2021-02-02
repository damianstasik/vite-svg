<h1 align="center">vite-plugin-react-svg</h1>
<p align="center">Extend Vite with ability to use SVG files as React components.</p>

### Features:
- [SVGO](https://github.com/svg/svgo) optimization
- [SVGR](https://react-svgr.com) customization
- Hot Module Replacement support
- Support for `?url` and `?component` query string

#### Currently supported Vite version:

<p><code>2.0.0-beta.61</code></p>

### Install

```bash
yarn add --dev vite-plugin-react-svg

npm i -D vite-plugin-react-svg
```

### Setup

```js
// vite.config.js
const reactRefresh = require('@vitejs/plugin-react-refresh');
const reactSvgPlugin = require('vite-plugin-react-svg');

module.exports = {
  plugins: [
    reactRefresh(),
    reactSvgPlugin(),
  ],
};
```

#### Options

```js
reactSvgPlugin({
  // Default behavior when importing `.svg` files, possible options are: 'url' and `component`
  defaultExport: 'url',

  // Boolean flag to enable/disable SVGO
  svgo: true,

  // SVGO configuration object
  svgoConfig: {},

  // Props to be forwarded on SVG tag, ossible options: "start", "end" or false
  expandProps: 'end',

  // Setting this to true will forward ref to the root SVG tag
  ref: false,

  // Setting this to true will wrap the exported component in React.memo
  memo: false,

  // Replace an attribute value by an other.
  // The main usage of this option is to change an icon color to "currentColor" in order to inherit from text color.
  // replaceAttrValues: { old: 'new' },
  replaceAttrValues: null,

  // Add props to the root SVG tag
  // svgProps: { name: 'value' },
  svgProps: null,

  // Add title tag via title property
  // <SvgIcon title="Accessible icon name" /> => <svg><title>Accessible icon name</title><...></svg>
  // <SvgIcon title="Accessible icon name" titleId="iconName" /> => <svg aria-labelledby="iconName><title id="iconName">Accessible icon name</title><...></svg>
  titleProp: false,
})
```

### Usage

```jsx
import MyIcon from './svgs/my-icon.svg?component';

function App() {
  return (
    <div>
      <MyIcon />
    </div>
  );
}
```
