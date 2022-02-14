const { runAsWorker } = require('synckit')

runAsWorker(async (filePath) => {
  const readConfiguration = (await import('@angular/compiler-cli')).readConfiguration;
  return readConfiguration(filePath);
})
