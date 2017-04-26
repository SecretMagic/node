"use strict";

const http = require("http");
// const Eps = require("express");
const Eps = require("./src/frame/eps.js");
const app = new Eps();
const formRouter = require("./src/router/formRouter.js");
const render = require("./src/frame/render.js");
//挂载路由
app.use("/", (req, res) => {
    render("./src/index.html", res);
});
app.use("/login", (req, res) => {
    render("./src/login.html", res);
});
app.use("/form", formRouter);

const server = http.createServer((req, res) => {
    //挂载过路由则返回true
    if (app.handle(req, res)) {
        return;
    }
    render("./src/404.html", res);
});

server.listen(3000);
console.log("server running");