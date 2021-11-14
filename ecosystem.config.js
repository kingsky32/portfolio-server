'use strict';

module.exports = {
  apps: [
    {
      name: 'seung-ju-server',
      script: './dist/main.js',
      watch: false,
      exec_mode: 'cluster',
    },
  ],
};
