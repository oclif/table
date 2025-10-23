import {expect} from 'chai'
import {spawnSync} from 'node:child_process'
import {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs'
import {extname, relative, resolve, sep} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const thisFile = fileURLToPath(import.meta.url)
const repoRoot = resolve(thisFile, '..', '..', '..')
const examplesDir = resolve(repoRoot, 'examples')
const snapshotsBaseDir = resolve(repoRoot, 'test', '__snapshots__')

// Discover example files recursively (including subdirectories like sf-specific)
function discoverExampleFiles(dir: string): string[] {
  const entries = readdirSync(dir)
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = resolve(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...discoverExampleFiles(fullPath))
    } else if (stat.isFile() && extname(fullPath) === '.ts') {
      files.push(fullPath)
    }
  }

  return files
}

const exampleFiles = discoverExampleFiles(examplesDir)

// Utility to run an example in a child process with stable env + width
function runExampleTs(fileAbsPath: string, columns: number): {stdout: string; stderr: string; status: number} {
  const fileUrl = pathToFileURL(fileAbsPath).href

  // Build an eval script that sets env+columns then imports the example (ESM)
  const evalScript = `
process.env.OCLIF_TABLE_COLUMN_OVERRIDE = '${columns}'; // override terminal width detection
process.env.NO_COLOR = '1'; // disable ANSI colors
process.env.FORCE_COLOR = '0'; // disable ANSI colors (supports-color)
process.env.FORCE_HYPERLINK = '0'; // disable terminal hyperlinks
process.env.TERM = 'dumb'; // generic, non-capable terminal
// Do not leak CI into examples unless explicitly set inside the script
delete process.env.CI;

import(${JSON.stringify(fileUrl)}).catch(err => {
  console.error('Failed to import example:', err);
  process.exit(1);
});
`

  const result = spawnSync(process.execPath, ['--input-type=module', '--loader', 'ts-node/esm', '-e', evalScript], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: {...process.env},
    maxBuffer: 10 * 1024 * 1024, // 10MB, some examples can be wide/tall
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  return {
    status: result.status ?? 0,
    stderr: result.stderr ?? '',
    stdout: result.stdout ?? '',
  }
}

function readSnapshotPath(exampleFile: string, width: number): string {
  // Get the relative path from examples dir to preserve subdirectory structure
  // Use relative() for cross-platform compatibility (handles both / and \ separators)
  const relativePath = relative(examplesDir, exampleFile)
  const snapshotPath = relativePath.replace(/\.ts$/, '.txt')
  const snapshotsDir = resolve(snapshotsBaseDir, `examples-${width}`)
  const fullSnapshotPath = resolve(snapshotsDir, snapshotPath)

  // Ensure the subdirectory exists
  const snapshotDir = resolve(fullSnapshotPath, '..')
  if (!existsSync(snapshotDir)) mkdirSync(snapshotDir, {recursive: true})

  return fullSnapshotPath
}

function normalize(out: string): string {
  // Keep spaces as-is (tables rely on them), only normalize line endings
  return out.replaceAll('\r\n', '\n')
}

// Shared test generator function
// eslint-disable-next-line mocha/no-exports
export function createSnapshotTests(width: number): void {
  describe(`examples snapshots (width: ${width})`, () => {
    // Check for missing snapshots for THIS width only
    it('ensures all example files have snapshot tests', () => {
      const exampleCount = exampleFiles.length
      expect(exampleCount).to.be.greaterThan(0, 'No example files found')

      if (!process.env.UPDATE_SNAPSHOTS) {
        const missingSnapshots: string[] = []

        for (const file of exampleFiles) {
          const snapPath = readSnapshotPath(file, width)
          if (!existsSync(snapPath)) {
            const name = relative(examplesDir, file).replaceAll(sep, '/')
            missingSnapshots.push(name)
          }
        }

        if (missingSnapshots.length > 0) {
          throw new Error(
            `Missing snapshots for ${missingSnapshots.length} example(s) at width ${width}:\n  - ${missingSnapshots.join('\n  - ')}\n\nRun: UPDATE_SNAPSHOTS=1 yarn test:examples`,
          )
        }
      }
    })

    // Generate tests for each example
    for (const file of exampleFiles) {
      const snapPath = readSnapshotPath(file, width)
      const name = relative(examplesDir, file).replaceAll(sep, '/')

      it(`matches snapshot: ${name}`, () => {
        const {status, stderr, stdout} = runExampleTs(file, width)
        if (status !== 0) {
          throw new Error(`Example failed (${name}): exit ${status}\n${stderr}`)
        }

        const actual = normalize(stdout)

        if (process.env.UPDATE_SNAPSHOTS) {
          writeFileSync(snapPath, actual, 'utf8')
          console.log(`updated snapshot: ${snapPath}`)
        } else {
          if (!existsSync(snapPath)) {
            throw new Error(`Missing snapshot for ${name}. Create it with: UPDATE_SNAPSHOTS=1 yarn test`)
          }

          // Normalize the expected snapshot too (in case it has CRLF from git checkout on Windows)
          const expected = normalize(readFileSync(snapPath, 'utf8'))
          expect(actual).to.equal(expected)
        }
      })
    }
  })
}
