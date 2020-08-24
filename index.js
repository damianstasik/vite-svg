const { compileTemplate } = require('@vue/compiler-sfc');
const { readFileSync } = require('fs');
const SVGO = require('svgo');

async function compileSvg(source, path, isBuild) {
  let { code } = compileTemplate({
    source,
    transformAssetUrls: false,
  });

  code = code.replace('export function render', 'function render');
  code += '\nconst VueComponent = { render };';

  if (!isBuild) {
    code += `\nVueComponent.__hmrId = ${JSON.stringify(path)};`;
  }

  code += `\nexport { VueComponent };`;

  return code;
}

async function optimizeSvg(svgo, content, path) {
  const { data } = await svgo.optimize(content, {
    path,
  });

  return data;
}

module.exports = (options = {}) => {
  const { svgoConfig } = options;
  const svgo = new SVGO(svgoConfig);
  const cache = new Map();

  return {
    transforms: [
      {
        test: ({ path, query, isBuild }) => {
          const isSVG = path.endsWith('.svg');

          return isBuild
            ? isSVG
            : isSVG && query.import != null;
        },
        transform: async ({ code: transformedCode, isBuild, path }) => {
          let result = cache.get(path);

          if (!result) {
            const code = readFileSync(path);

            const svg = await optimizeSvg(svgo, code, path);

            result = await compileSvg(svg, path, isBuild);

            if (isBuild) {
              cache.set(path, result);
            }
          }

          return `${transformedCode}\n${result}`;
        },
      },
    ],
  };
};
