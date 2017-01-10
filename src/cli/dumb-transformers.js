import fs from 'fs';
import * as dumbTransformers from '../dumb-transformers';

function executeDumbTransformation(files, flags, transformation) {
    for (const file of files) {
        console.log('Executing dumb ' + transformation + ' with ' + file);
        let contents = fs.readFileSync(file).toString();
        let newContents = dumbTransformers[transformation](contents);
        const changesMade = contents !== newContents;
        console.log(changesMade ? 'Changes made!' : 'No changes made!');
        if (!flags.dry && changesMade) {
            fs.writeFileSync(file, newContents);
        }

        if (flags.print) {
            console.log(newContents);
        }
    }
}

export function executeDumbTransformations(files, flags) {
    ['replacer', 'sinon'].forEach(transformation => {
        executeDumbTransformation(files, flags, transformation);
    });
}
