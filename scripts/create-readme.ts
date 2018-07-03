import * as Handlebars from 'handlebars';
import * as parseComments from 'parse-comments';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

let rootPackage = process.cwd();
let packageJson = require(join(rootPackage, 'package.json'));
let name = packageJson.name.replace(/^.*\/[-_]?/, '');
let camelName = camelPackageName(packageJson.name);
let isGroup = /^@pakal\/-.*/.test(packageJson.name);
let isInternal = /^@pakal\/_.*/.test(packageJson.name);

let data = {
    repo: {
        url: 'https://github.com/yisraelx/pakal'
    },
    package: {
        fullName: packageJson.name,
        subName: packageJson.name.replace(/^.*\//, ''),
        name,
        description: packageJson.description
    },
    comments: getComments('./index.ts')
};

Handlebars.registerHelper('keys', (global, path) => {
    let lib = require(join(rootPackage, path));
    let keys = Object.keys(lib);

    if (Boolean(global)) {
        keys = keys.reduce((keys, key) => {
            if (lib[key]) {
                keys.push(key);
            }
            return keys;
        }, []);
    }

    let defaultIndex = keys.indexOf('default');
    if (defaultIndex > -1) {
        let importName = isInternal ? `_${camelName}` : camelName;
        keys[defaultIndex] = !Boolean(global) ? `default as ${importName}` : importName;
    }
    return keys.join(',\n ');
});

Handlebars.registerHelper('examples', (examples = []) => {
    examples = examples.map(example => `\`\`\`typescript
${example.replace(/^true[\n]*/, '')}
\`\`\``);
    return examples.length ? `
**Examples**
${examples.join('\n')}
` : '';
});

Handlebars.registerPartial('header', `
# {{ package.fullName }}
[![Source Code](https://img.shields.io/badge/%3C%2F%3E-source_code-blue.svg)]({{repo.url}}/blob/master/modules/{{package.subName}})
[![Version](https://img.shields.io/npm/v/{{package.fullName}}.svg)](https://www.npmjs.com/package/{{package.fullName}})
[![MIT License](https://img.shields.io/npm/l/{{package.fullName}}.svg)]({{repo.url}}/blob/master/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/{{package.subName}}.svg)](https://bundlephobia.com/result?p={{package.subName}})

{{#if package.description}}
**{{ package.description }}**
{{/if}}
`);

Handlebars.registerPartial('install', `
## Install
\`\`\`sh
$ npm install --save {{package.fullName}}
\`\`\`
`);

Handlebars.registerPartial('use', `
## Use
{{#if comments.description}}
**{{{ comments.description }}}**
{{/if}}
**Module**
\`\`\`ts
import {
 {{keys false './'}}
} from '{{package.fullName}}';
\`\`\`
**Browser**
\`\`\`html
<script src="https://unpkg.com/{{package.fullName}}/bundle.umd.min.js"></script>
\`\`\`
\`\`\`ts
let {
 {{keys true './'}}
} = _;
\`\`\`

{{{examples comments.examples}}}
`);

Handlebars.registerPartial('compatibility', `
## Compatibility
These modules are written in typescript and available in ES5 and ES6 standard.
`);

Handlebars.registerPartial('license', `
## License
Copyright © 2018 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license]({{repo.url}}/blob/master/LICENSE).
`);

let template = Handlebars.compile(`
{{> header }}
{{> install }}
{{> use }}
{{> compatibility }}
{{> license }}
`);

let md = template(data);

writeFileSync('./README.md', md, {encoding: 'utf8'});

function camelPackageName(name: string) {
    return name.replace(/^.*\/[-_]?/, '').replace(/-[a-z]/g, (letter) => letter[1].toUpperCase());
}


function getComments(path: string) {
    let source = readFileSync(path).toString();
    let [data] = parseComments(source).filter((block) => block['example']);
    if (typeof data !== 'object') {
        return {};
    }
    let {examples, example} = data;
    delete data.example;
    data.examples = [examples, example].reduce((data, value) => {
        value = Array.isArray(value) ? value : (value as string).split(/[\n\s]+,[\n]{2}/g);
        return data.concat(value);
    }, []);
    return data;
}
