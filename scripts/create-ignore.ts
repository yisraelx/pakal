import { writeFile } from 'fs';

let ignoreList = [
    '*.ts',
    '!*.d.ts',
    '__tests__'
];

writeFile('.npmignore', ignoreList.join('\n'), { encoding: 'utf8' }, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
});
