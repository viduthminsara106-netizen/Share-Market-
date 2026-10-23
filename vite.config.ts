import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function unwrapCssLayers(css: string): string {
  // Remove standalone @layer statements like `@layer properties;` or `@layer theme, base, components, utilities;`
  let result = css.replace(/@layer\s+[^{;]+;/g, '');

  // Unwrap `@layer <name> { ... }` blocks while keeping balanced braces intact
  const layerRegex = /@layer\s+[a-zA-Z0-9_-]+\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = layerRegex.exec(result)) !== null) {
    const startIdx = match.index;
    const openBraceIdx = startIdx + match[0].length - 1;
    let depth = 1;
    let i = openBraceIdx + 1;
    while (i < result.length && depth > 0) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') depth--;
      i++;
    }
    if (depth === 0) {
      const innerContent = result.slice(openBraceIdx + 1, i - 1);
      result = result.slice(0, startIdx) + innerContent + result.slice(i);
      layerRegex.lastIndex = startIdx;
    } else {
      break;
    }
  }

  // Replace ` in oklab` in linear-gradient directions for older mobile browsers
  result = result.replace(/\s+in\s+oklab/g, '');
  return result;
}

function mobileCssCompatPlugin(): Plugin {
  return {
    name: 'mobile-css-compat',
    enforce: 'post',
    transform(code, id) {
      if (id.endsWith('.css')) {
        return {
          code: unwrapCssLayers(code),
          map: null,
        };
      }
    },
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && fileName.endsWith('.css') && typeof chunk.source === 'string') {
          chunk.source = unwrapCssLayers(chunk.source);
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mobileCssCompatPlugin()],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    css: {
      transformer: 'lightningcss' as const,
      lightningcss: {
        targets: {
          chrome: 80 << 16,
          safari: 14 << 16,
          android: 80 << 16,
        },
      },
    },
    build: {
      cssTarget: ['chrome80', 'safari14'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
