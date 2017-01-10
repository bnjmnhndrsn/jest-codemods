import path from 'path';
import execa from 'execa';

export const transformerDirectory = path.join(__dirname, '../', 'transformers');
export const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

function executeTransformation(files, flags, transformer) {
    console.log(flags);
    const transformerPath = path.join(transformerDirectory, `${transformer}.js`);

    const args = ['-t', transformerPath].concat(files);
    if (flags.dry) {
        args.push('--dry');
    }
    if (flags.print) {
        args.push('--print')
    }
    if (['babel', 'babylon', 'flow'].indexOf(flags.parser) >= 0) {
        args.push('--parser', flags.parser);
    }

    console.log(`Executing command: jscodeshift ${args.join(' ')}`);

    const result = execa.sync(jscodeshiftExecutable, args, {
        stdio: 'inherit',
        stripEof: false,
    });

    if (result.error) {
        throw result.error;
    }
}

export function executeTransformations(files, flags, transformers) {
    transformers.forEach(t => {
        executeTransformation(files, flags, t);
    });
}
