const { createServer } = require('vite');
const { getDevSvgPlugin } = require('vite-plugin-svg');

createServer({
  plugins: [getDevSvgPlugin()],
}).listen(3000);
