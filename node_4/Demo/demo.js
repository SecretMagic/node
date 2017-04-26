"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");
const userObj = { user: "111", code: "222" };

const server = http.createServer((req, res) => {
    let obj = url.parse(req.url, true);
    let path = obj.pathname;
    let { user, code } = obj.query;
    if (path === "/") {
        render("./src/index.html", res);
    } else if (path === "/login") {
        render("./src/login.html", res);
    } else if (path === "/form") {
        if (user === userObj.user && code === userObj.code) {
            render("./src/success.html", res);
        } else {
            render("./src/failed.html", res);
        }
    } else {
        render("./src/404.html", res);
    }
});

const render = (fileName, res) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
}

server.listen(3000);
console.log("server running");