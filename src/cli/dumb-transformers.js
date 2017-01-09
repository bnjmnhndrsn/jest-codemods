import fs from 'fs';
import { replacer } from '../dumb-transformers';

function executeDumbTransformation(files, flags) {
    for (const file of files) {
        console.log('Executing dumb transformation with ' + file);
        let contents = fs.readFileSync(file).toString();
        contents = replacer(contents);
        if (!flags.dry) {
            fs.writeFileSync(file, contents);
        }

        if (flags.print) {
            console.log(contents);
        }
    }
}

export function executeDumbTransformations(files, flags) {
    executeDumbTransformation(files, flags);
}
