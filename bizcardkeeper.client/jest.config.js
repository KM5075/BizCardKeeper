export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-fixed-jsdom',
    testMatch: ['<rootDir>/src/**/*.(test).ts?(x)'], // フロントのみに限定
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'], // Playwrightのパスを除外
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
