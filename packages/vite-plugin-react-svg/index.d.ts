declare const plugin: (options?: {
  /** @default "url" */
  defaultExport?: 'url' | 'component';
  /** @default true */
  svgo?: boolean;
  svgoConfig?: import('svgo').Options;
  /** @default "end" */
  expandProps?: 'start' | 'end' | false;
  ref?: boolean;
  memo?: boolean;
  replaceAttrValues?: { [key: string]: string };
  svgProps?: JSX.IntrinsicElements['svg'];
  titleProp?: boolean;
}) => import('vite').Plugin;

export = plugin;
