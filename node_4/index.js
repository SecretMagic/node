"use strict";
//nodemon一直监听服务器状态

const http = require("http");
const url = require("url");
//(req -> http.IncomingMessage)封装了客户端发送过来的请求  (res -> http.ServerResponse)可操作返回给用户的响应
const server = http.createServer((req, res) => {
    // console.log(req.headers); //请求头，记录请求信息
    // console.log(req.url);//请求路径
    // console.log(req.method, req.httpVersion);//请求方法，http协议版本 
    //************************************* */
    // let bodyData = "";
    // req.on("data", (chunk) => {
    //     bodyData += chunk; //流
    // });
    // req.on("end", () => {
    //     console.log(bodyData); //请求主体
    // })

    // res.end();
    //************************************ */
    // res.write("", "utf-8", () => {});

    res.statusCode = 200; //响应状态码
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "text/html");

    res.setHeader("Set-Cookie", ["name=wy", "age=20"]); //请求完后设置对应cookie       session

    // res.writeHead(200, "ok", {
    //     "Set-Cookie": ["name=wy", "age=20"]
    // });

    res.write("1");
    res.write("<h1>Hello World</h1>");
    res.end("3");




});
//等同
// const server = http.createServer();
// server.on("request",  () => {})

server.listen(3000);
console.log("server running");