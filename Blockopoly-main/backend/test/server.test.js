const assert = require('assert');
const http = require('http');
const { spawn } = require('child_process');

const serverProcess = spawn('node', ['server.js'], { env: { ...process.env, PORT: '4000' } });

function waitServerReady() {
  return new Promise(resolve => {
    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server listening')) {
        resolve();
      }
    });
  });
}

(async () => {
  await waitServerReady();
  const req = http.request({ method: 'POST', port: 4000, path: '/create-room' }, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      serverProcess.kill();
      const json = JSON.parse(body);
      assert.ok(json.roomCode, 'roomCode should be returned');
      console.log('Test passed');
    });
  });
  req.end();
})();
