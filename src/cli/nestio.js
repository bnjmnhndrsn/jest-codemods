#!/usr/bin/env node
import { executeTransformations } from './transformers';
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
    `,
    },
    {
        boolean: ['force', 'dry'],
        string: ['_'],
        alias: {
            f: 'force',
            h: 'help',
            d: 'dry',
        },
    }
);

updateNotifier({ pkg: cli.pkg }).notify({ defer: false });

const TRANSFORMER_CHAI_ASSERT = 'chai-assert';
const TRANSFORMER_MOCHA = 'mocha';
const ARROW_FUNCTIONS = 'arrow-functions'
const allTransformers = [TRANSFORMER_CHAI_ASSERT, TRANSFORMER_MOCHA, ARROW_FUNCTIONS];

executeTransformations(cli.input, cli.flags, allTransformers);
