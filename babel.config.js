module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: ["> 1%"]
          },
          useBuiltIns: "usage",
          corejs: "2.0.0"
        }
      }
    ]
  ],
  plugins: ["inline-react-svg"]
};
