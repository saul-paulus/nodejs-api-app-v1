/**
 * dependency-cruiser configuration to enforce clean-architecture boundaries
 * Run with: npx dependency-cruiser --config .dependency-cruiser.js --validate src
 */
module.exports = {
  forbidden: [
    {
      name: 'no-domain-to-infrastructure',
      comment: 'Domain and application layers must not import from infrastructure or interfaces',
      severity: 'error',
      from: { path: '^src/modules/.*/(domain|application)/' },
      to: { path: '^src/modules/.*/infrastructure/' },
    },
    {
      name: 'no-domain-to-interfaces',
      comment: 'Domain and application layers must not import from interfaces',
      severity: 'error',
      from: { path: '^src/modules/.*/(domain|application)/' },
      to: { path: '^src/modules/.*/interfaces/' },
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    }
  }
};
