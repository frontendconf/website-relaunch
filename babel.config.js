module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-env": {
          targets: {
            browsers: ["> 1%"]
          },
          useBuiltIns: "usage"
        }
      }
    ]
  ],
  plugins: ["inline-react-svg"]
};
