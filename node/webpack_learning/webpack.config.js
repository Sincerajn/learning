const path = require("path")

module.exports = {
    entry: "./main.js",
    output: {
        filename: "pack.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development"
}