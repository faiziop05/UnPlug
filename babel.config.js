module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": ".",                  // project root
            "@components": "./components",
            "@assets": "./assets",
            "@utils": "./utils",
            "@screens": "./src/screens",
          },
        },
      ],
    ],
  };
};
