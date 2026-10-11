import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
// Keep local AI credentials in the API process, outside the frontend environment.
const apiEnv = { ...process.env };
const webEnv = { ...process.env };
delete webEnv.OPENAI_API_KEY;
const settingsFile = path.join(root, 'settings.json');
if (existsSync(settingsFile)) {
  let settings;
  try {
    settings = JSON.parse(readFileSync(settingsFile, 'utf8').replace(/^\uFEFF/, ''));
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new Error();
  } catch {
    // JSON parser errors may include snippets of the secret, so use a fixed message.
    throw new Error('Could not read settings.json. Check that it is a valid JSON object.');
  }
  for (const key of ['OPENAI_API_KEY', 'OPENAI_MODEL', 'BMWPM_REDDIT_MODEL', 'BMWPM_CATEGORIZER_MODEL']) {
    if (typeof settings[key] === 'string' && settings[key].trim()) apiEnv[key] = settings[key].trim();
  }
}
const apiPort = process.env.BMWPM_API_PORT || '8001';
const webPort = process.env.BMWPM_WEB_PORT || '3001';
webEnv.BMWPM_API_URL ||= `http://127.0.0.1:${apiPort}`;
const webMode = process.argv.includes('--production') ? 'start' : 'dev';
const python = process.env.BMWPM_PYTHON || path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
if (!existsSync(python)) throw new Error('Run the setup steps in README.md to create .venv first.');
const children = [
  spawn(python, ['-m', 'uvicorn', 'backend.app:app', '--host', '127.0.0.1', '--port', apiPort], { stdio: 'inherit', windowsHide: true, env: apiEnv }),
  spawn(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), webMode, '--hostname', '127.0.0.1', '--port', webPort], { stdio: 'inherit', windowsHide: true, env: webEnv }),
];
let stopping = false;
function stop(code = 0) { if (stopping) return; stopping = true; for (const child of children) child.kill(); setTimeout(() => process.exit(code), 500); }
process.on('SIGINT', () => stop()); process.on('SIGTERM', () => stop());
for (const child of children) { child.on('error', e => { console.error(e.message); stop(1); }); child.on('exit', code => stop(code || 0)); }
