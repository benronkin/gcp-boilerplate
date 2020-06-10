const fs = require('fs');
const spawn = require('cross-spawn');
const [_, __, envFileName, command, scriptName] = process.argv;
fs.readFile(envFileName, 'utf-8', (err, vars) => {
  if (err) throw err;
  vars.split('\n').forEach((va) => {
    const [k, v] = va.split(/:(.+)/);
    if (k) {
      process.env[k.trim()] = v.trim();
    }
  });
  spawn(command, [scriptName], {
    stdio: 'inherit',
  });
});
