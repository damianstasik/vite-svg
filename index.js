const { readBody, isImportRequest } = require('vite');
const { compile } = require('@vue/compiler-dom');
const { readFile } = require('fs-extra');
const SVGO = require('svgo');

const cache = new Map();

async function optimizeAndCompileSvg(svgo, content, path) {
  const { data } = await svgo.optimize(content, {
    path,
  });

  const { code } = compile(data, {
    mode: 'module',
    runtimeModuleName: '/@modules/vue',
  });

  return `${code.replace('export ', '')}\nexport default { render }`;
}

function getDevSvgPlugin(options = {}) {
  const { svgoConfig } = options;

  return ({ app }) => {
    const svgo = new SVGO(svgoConfig);

    app.use(async (ctx, next) => {
      await next();

      if (
        ctx.path.endsWith('.svg') &&
        typeof ctx.query.component !== 'undefined' &&
        isImportRequest(ctx) &&
        ctx.body
      ) {
        const body = await readBody(ctx.body);

        ctx.type = 'js';
        ctx.body = await optimizeAndCompileSvg(svgo, body, ctx.path);
      }
    });
  };
}

function getBuildSvgPlugin(options = {}) {
  const { svgoConfig } = options;
  const svgo = new SVGO(svgoConfig);

  return {
    name: 'vite-svg',
    resolveId(source) {
      if (source.endsWith('.svg?component')) {
        return source;
      }

      return null;
    },
    async load(id) {
      if (!id.endsWith('.svg?component')) {
        return null;
      }

      let cachedBody = cache.get(id);

      if (!cachedBody) {
        const body = await readFile(id.replace('?component', ''));

        cachedBody = await optimizeAndCompileSvg(svgo, body, id);

        cache.set(id, cachedBody);
      }

      return {
        code: cachedBody,
        map: {
          mappings: '',
        },
      };
    },
  };
}

module.exports = {
  getDevSvgPlugin,
  getBuildSvgPlugin,
};
