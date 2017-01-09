#!/usr/bin/env node
import { executeTransformations } from './transformers';
import { executeDumbTransformations } from './dumb-transformers';

import meow from 'meow';
import updateNotifier from 'update-notifier';

const cli = meow(
    {
        description: 'Codemods for migrating test files to Jest.',
        help: `
    Usage
      $ jest-codemods <path> [options]

    path    Files or directory to transform. Can be a glob like src/**.test.js

    Options
      --force, -f   Bypass Git safety checks and forcibly run codemods
      --dry, -d     Dry run (no changes are made to files)
      --parser      The parser to use for parsing your source files (babel | babylon | flow)  [babel]
      --print, -p   Print output, useful for development
    `,
    },
    {
        boolean: ['force', 'dry', 'print'],
        string: ['_'],
        alias: {
            f: 'force',
            h: 'help',
            d: 'dry',
            p: 'print'
        },
    }
);

updateNotifier({ pkg: cli.pkg }).notify({ defer: false });

const TRANSFORMER_CHAI_ASSERT = 'chai-assert';
const TRANSFORMER_MOCHA = 'mocha';
const ARROW_FUNCTIONS = 'arrow-functions'
const allTransformers = [ARROW_FUNCTIONS, TRANSFORMER_CHAI_ASSERT, TRANSFORMER_MOCHA];

executeTransformations(cli.input, cli.flags, allTransformers);
executeDumbTransformations(cli.input, cli.flags);
