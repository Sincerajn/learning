export const entry = {
    index: "./js/index.js",
    signup: "./js/signup.js"
}
export const output = {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
}
export const module = {
    rules: [{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
    }]
}
export const mode = "development"