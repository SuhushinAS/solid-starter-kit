import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import {defineConfig, globalIgnores} from 'eslint/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  globalIgnores(['.git/', 'coverage/', 'node_modules/', 'www/', '**/*.min.js']),
  {
    extends: compat.extends('./eslint-config/index.json'),
    plugins: {'@stylistic': stylistic},
  },
]);
