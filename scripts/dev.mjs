import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const portFlag = process.argv.indexOf('--port');
const port = (portFlag >= 0 && process.argv[portFlag + 1]) || process.env.PORT || '3000';
const projectDir = process.cwd();
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', projectDir, '--webpack', '--hostname', '0.0.0.0', '--port', port], { cwd: projectDir, stdio: 'inherit', env: process.env });
child.on('exit', code => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
