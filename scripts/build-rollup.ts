import { rollup, OutputOptions, RollupFileOptions } from 'rollup';
import * as alias from 'rollup-plugin-alias';
import { uglify } from 'rollup-plugin-uglify';
import * as tsPlugin from 'rollup-plugin-typescript';
import * as typescript from 'typescript';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as cleanUp from 'rollup-plugin-cleanup';
import { join } from 'path';
import { existsSync } from "fs";

let packagePath: string = process.cwd();
let packageJson = require(join(packagePath, 'package.json'));
let camelName: string = camelPackageName(packageJson.name);
let isGroup: boolean = /^(.*\/-.*|pakal)/.test(packageJson.name);
let isInternal: boolean = /^.*\/_.*/.test(packageJson.name);
let scope = 'pakal';

let buildVersions = [
    {inputFile: 'index', globalName: '_', outputFile: 'index.es6', outputFormat: 'es', target: 'es6', isBundle: false},
    {inputFile: 'index', globalName: '_', outputFile: 'index.esm', outputFormat: 'es', isBundle: false},
    {inputFile: 'index', globalName: '_', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true, minify: true},
    {inputFile: 'index', globalName: '_', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true}
];

buildVersions.reduce(async (dfd: Promise<any>, options) => {
    let {inputFile} = options;
    if (existsSync(`${inputFile}.ts`)) {
        await build(options);
    }
}, Promise.resolve()).catch((error) => {
    console.error(error);
    process.exit(1);
});

async function build({inputFile, globalName, outputFile, outputFormat, target = 'es5', isBundle = false, minify = false}) {
    let inputOptions: RollupFileOptions = {
        input: `${inputFile}.ts`,
        plugins: [
            alias({
                [`@${scope}`]: join(process.cwd(), '../../modules'),
                resolve: ['.ts', `/${inputFile}.ts`]
            }),
            tsPlugin({
                importHelpers: true,
                typescript,
                tsconfig: false,
                target,
                include: ['../../modules/**/*.ts', '../../alias/**/*.ts']
            }),
            nodeResolve({jsnext: true, main: true}),
            cleanUp({comments: 'none', extensions: ['.ts']})
        ]
    };

    let outputOptions: OutputOptions = {
        banner: createBanner(inputFile),
        sourcemap: true,
        interop: false,
        exports: 'named',
        extend: true,
        file: `${outputFile}${minify ? '.min' : ''}.js`,
        format: outputFormat,
        name: globalName
    };

    if (minify) {
        inputOptions.plugins.push(
            uglify({output: {comments: false, preamble: createBanner(inputFile)}})
        );
    }

    let {peerDependencies = {}} = packageJson;
    let peerKeys = Object.keys(peerDependencies);

    if (!isBundle) {
        let {dependencies = {}} = packageJson;
        inputOptions.external = (id) => peerKeys.indexOf(id) !== -1 || /(@pakal\/.*)/.test(id);
        outputOptions.globals = Object.keys(dependencies).reduce((globals, name) => {
            let key = `${isInternal ? '_' : ''}${globalName}.${camelPackageName(name)}`;
            globals[key] = key;
            return globals;
        }, {});
    } else {
        inputOptions.external = peerKeys;
        outputOptions.globals = peerKeys.reduce((globals, name) => {
            globals[name] = name;
            return globals;
        }, {});
    }

    // for global use
    if (!isGroup && outputFormat === 'umd') {
        let key = `${isInternal ? '_' : ''}${camelName}`;
        outputOptions.outro = `exports.${key} = ${key};`;
    }

    let roll = await rollup(inputOptions);

    return roll.write(outputOptions);
}


function camelPackageName(name: string) {
    return name.replace(/^.*\/[-_]?/, '').replace(/-[a-z]/g, (letter) => letter[1].toUpperCase());
}

function createBanner(source: string) {
    let {name, license} = packageJson;
    return `/**
* @module ${name}${source !== 'index' ? `/${source}` : ''}
* @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
* @license ${license}
*/`;
}
