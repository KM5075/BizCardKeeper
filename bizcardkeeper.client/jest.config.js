export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-fixed-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
