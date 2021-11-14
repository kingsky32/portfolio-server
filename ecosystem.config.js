'use strict';

module.exports = {
  apps: [
    {
      name: 'seung-ju-server',
      script: 'npm run start:prod',
      watch: false,
      exec_mode: 'cluster',
    },
  ],
};
