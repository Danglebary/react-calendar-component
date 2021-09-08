import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import sucrase from '@rollup/plugin-sucrase';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            sucrase({
                exclude: ['node_modules/**'],
                transforms: ['typescript', 'jsx', 'imports'],
            }),
            external(),
            resolve({
                extensions
            }),
            postcss({
                plugins: [],
                minimize: true,
            }),
            terser(),
        ]
    }
]