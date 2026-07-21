module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'node'],
  resolver: '<rootDir>/jest.resolver.cjs',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!(@actions)/)'],
  verbose: true
}