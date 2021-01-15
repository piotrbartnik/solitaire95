const path = require("path");
module.exports = {
  watch: true,
  entry: "./src/index.ts",
  externals: [
    {
      react: {
        root: "React",
        amd: "react",
      },
      "react-dom": {
        root: "ReactDOM",
        amd: "react-dom",
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "./font/[hash].[ext]",
              mimetype: "application/font-woff",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "amd",
  },
};
