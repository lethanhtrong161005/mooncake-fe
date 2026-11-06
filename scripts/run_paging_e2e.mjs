import { spawn } from 'node:child_process';

const child = spawn(process.execPath,
  ['node_modules/@playwright/test/cli.js', 'test', 'tests/paging.spec.js', '--reporter=line'], {
  cwd: new URL('../', import.meta.url), stdio: 'inherit',
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });
