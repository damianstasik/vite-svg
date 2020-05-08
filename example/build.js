const { build } = require('vite');
const { getBuildSvgPlugin } = require('vite-plugin-svg');

(async () => {
  await build({
    rollupInputOptions: {
      plugins: [getBuildSvgPlugin()],
    },
  });
})();
