const { compile } = require('@vue/compiler-dom');
const SVGO = require('svgo');

async function compileSvg(code, path, isBuild) {
  const { code: compiledCode } = compile(code, {
    mode: 'module',
    runtimeModuleName: isBuild ? undefined : '/@modules/vue',
  });

  return `
${compiledCode.replace('export ', '')}

export default {
  render,
  __hmrId: ${JSON.stringify(path)}
}
`;
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
        test: (path, query) => path.endsWith('.svg') && query.component != null,
        transform: async (code, isImport, isBuild, path) => {
          let result = cache.get(path);

          if (!result) {
            const svg = await optimizeSvg(svgo, code, path);

            result = await compileSvg(svg, path, isBuild);

            if (isBuild) {
              cache.set(id, result);
            }
          }

          return result;
        },
      },
    ],
  };
};
