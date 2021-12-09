'use strict';

module.exports = {
  apps: [
    {
      name: 'seung-ju-server',
      script: './dist/main.js',
      instances: 0,
      autorestart: true,
      watch: false,
      exec_mode: 'cluster',

      output: '~/logs/pm2/console.log',
      error: '~/logs/pm2/onsoleError.log',
    },
  ],
};
