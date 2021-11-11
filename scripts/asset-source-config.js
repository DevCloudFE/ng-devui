function assetSourceConfig(config) {
  config.module.rules.forEach(rule => {
    rule.resourceQuery = { not: [/raw/] };
  });
  config.module.rules.push(
    {
      resourceQuery: /raw/,
      type: 'asset/source',
    });
  return config;
};

module.exports = assetSourceConfig;