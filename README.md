<img src="https://user-images.githubusercontent.com/449385/38243295-e0a47d58-372e-11e8-9bc0-8c02a6f4d2ac.png" width="260" height="73">

[![Version](https://img.shields.io/npm/v/@oclif/table.svg)](https://npmjs.org/package/@oclif/table)
[![Downloads/week](https://img.shields.io/npm/dw/@oclif/table.svg)](https://npmjs.org/package/@oclif/table)
[![License](https://img.shields.io/npm/l/@oclif/table.svg)](https://github.com/oclif/table/blob/main/LICENSE)

# Description

Print tables to the terminal using [ink](https://www.npmjs.com/package/ink)

# Examples

You can see examples of how to use it in the [examples](./examples/) directory.

You can run any of these with the following:

```
tsx examples/basic.ts
```

# Testing

This package includes snapshot tests for all examples to ensure consistent output across different environments.

## Running Tests

```bash
# Run all tests (including snapshot tests)
yarn test

# Run only snapshot tests
yarn test:examples

# Update snapshots after intentional changes
yarn test:examples:update
```

## How Snapshot Testing Works

The snapshot tests run each example script in an isolated child process with:

- Fixed terminal width (`OCLIF_TABLE_COLUMN_OVERRIDE = 120`)
- Disabled ANSI colors and hyperlinks for stability
- Forced Ink rendering mode (not plain text)

This ensures that:

- Tests pass consistently in CI and locally regardless of terminal size
- Visual table output is captured and can be reviewed in diffs
- Breaking changes to table rendering are caught immediately
- All example files (including subdirectories) have corresponding snapshot tests

Snapshots are stored in `test/__snapshots__/examples/*.txt` with the same directory structure as the examples folder.

# Contributing

See the [contributing guide](./CONRTIBUTING.md).
