const { compileTemplate } = require('@vue/compiler-sfc');
const { readFileSync } = require('fs');
const SVGO = require('svgo');

async function compileSvg(source, id) {
  let { code } = compileTemplate({
    id,
    source,
    transformAssetUrls: false,
  });

  code = code.replace('export function render', 'function render');
  code += `\nexport default { render };`;

  return code;
}

async function optimizeSvg(svgo, content, path) {
  const { data } = await svgo.optimize(content, {
    path,
  });

  return data;
}

module.exports = (options = {}) => {
  const { svgoConfig, defaultExport = 'url' } = options;
  const svgo = new SVGO(svgoConfig);
  const cache = new Map();
  const svgRegex = /\.svg(?:\?(component|url))?$/

  return {
    name: 'vue-svg',
    async transform(source, id, isBuild) {
      const result = id.match(svgRegex);

      if (result) {
        const type = result[1];

        if ((defaultExport === 'url' && typeof type === 'undefined') || type === 'url') {
          return source;
        }

        if ((defaultExport === 'component' && typeof type === 'undefined') || type === 'component') {
          const idWithoutQuery = id.replace('.svg?component', '.svg')
          let result = cache.get(idWithoutQuery);

          if (!result) {
            const code = readFileSync(idWithoutQuery);

            const svg = await optimizeSvg(svgo, code, idWithoutQuery);

            result = await compileSvg(svg, idWithoutQuery);

            if (isBuild) {
              cache.set(idWithoutQuery, result);
            }
          }

          return result;
        }
      }
    }
  }
}
