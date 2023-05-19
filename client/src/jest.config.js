module.exports = {
  // ...
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
};
