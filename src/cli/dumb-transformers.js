import fs from 'fs';
import { replacer } from '../dumb-transformers';

function executeDumbTransformation(files, flags) {
    for (const file of files) {
        let contents = fs.readFileSync(file).toString();
        console.log(contents);
        contents = replacer(contents);
        if (!flags.dry) {
            fs.writeFileSync(contents);
        }

        if (flags.print) {
            console.log(contents);
        }
    }
}

export function executeDumbTransformations(files, flags) {
    executeDumbTransformation(files, flags);
}
