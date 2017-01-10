const REPLACEMENTS = [
    ['to\.be\.null', 'toBeNull'],
    ['to\.be\.true', 'toBe(true)'],
    ['to\.be\.false', 'toBe(false)'],
    ['to\.deep\.equal', 'toEqual'],
    ['to\.equal', 'toEqual'],
    ['to\.not\.equal', 'not.toEqual'],
    ['to\.be\.ok', 'toBeTruthy'],
    ['to\.be\.not\.ok', 'toBeFalsy'],
    ['to\.not\.be\.ok', 'toBeFalsy'],
    ['to\.be\.a\(.{1,2}array.{1,2}\)', 'toEqual(expect.any(Array))'],
    ['to\.be\.a\(.{1,2}object.{1,2}\)', 'toEqual(expect.any(Object))'],
    ['to\.be\.a\(.{1,2}number.{1,2}\)', 'toEqual(expect.any(Number))'],
    ['to\.be\.a\(.{1,2}boolean.{1,2}\)', 'toEqual(expect.any(Boolean))'],
    ['to\.be\.a\(.{1,2}function.{1,2}\)', 'toEqual(expect.any(Function))'],
    ['expect\\(wrapper\\.props\\(\\)\\)\\.to\\.have\\.all\\.keys\\(keys\\)', 'expect(Object.keys(wrapper.props()).sort()).toEqual(keys.sort())'],
];

export function replacer(contents) {
    for (const replacement of REPLACEMENTS) {
        const re = new RegExp(replacement[0], 'g');
        contents = contents.replace(re, replacement[1]);
    }
    return contents;
}
