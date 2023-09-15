module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
    },
    testPathIgnorePatterns: ['/node_modules/', '/resources/', '/.angular/'],
};
  