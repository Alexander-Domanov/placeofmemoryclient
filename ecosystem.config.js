module.exports = {
  apps: [
    {
      name: 'place_front',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3033',
      restartDelay: 1000,
      instances: 1,
      autorestart: true,
    },
  ],
};
