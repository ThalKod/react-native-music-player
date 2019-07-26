/* module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
}; */

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: ["@babel/plugin-transform-flow-strip-types",'inline-dotenv', '@babel/plugin-proposal-class-properties', ["@babel/plugin-proposal-decorators",
      {
        legacy: true
      } ]
    ]
  };
};
