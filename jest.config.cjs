module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^node:stream$': 'stream-browserify',
  },
};