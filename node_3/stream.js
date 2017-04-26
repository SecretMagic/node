"use strict";
//node.js将文件内容视为一个整体，为其分配缓存区并且一次性将文件内容读取到缓存区中，
//在这个期间，node.js不能执行其他任何处理，所以当读写大文件时，有可能造成缓存区“爆仓”

//read或readSync方法读取文件内容是不断的将文件中的一小块内容读入缓存区，最后从该缓存区中读取内容
//const rs = fs.createReadStream("3stream.mp4");

// write或writeSync方法写入内容时，node.js执行以下过程：
//     1.将需要写入的数据写入到一个内存缓存区
//     2.待缓存区写满后再将缓存区中的内容写入到文件中
//     3.重复执行步骤1和步骤2，直到数据全部写入文件为止

//fs.readFile读取时会首先放到缓存区

const fs = require("fs");

//创建流读取文件，flags:w (整体替换) a (在后面加) r (读)默认 
// let rs = fs.createReadStream("./stream.txt", { encoding: "utf-8" });
//继承了events，data方法，默认返回小于64kb大小数据
// rs.on("open", () => {
//     console.log("open");
// });
// rs.on("data", (data) => {
//     console.log(data);
//     rs.pause();//暂停读取
//     setTimeout( () => {
//         rs.resume();//恢复读取
//     }, 2000)
// });
// rs.on("end", () => {
//     console.log("end");
// });
// //默认close: true;完成之后自动触发
// rs.on("close", () => {
//     console.log("close");
// });

//***************************************************************** */
//readable事件，加read等同于data事件， 处理极限的情况下可以使用readable
// let chunk = "";
// rs.on("readable", () => {
//     let data = rs.read();
//     if (data === null) {
//         return;
//     }
//     chunk += data;
// });
// rs.on("end", () => {
//     console.log("end", chunk);
// });
// rs.on("close", () => {
//     console.log("close");
// });
//***************************************************************** */
// let rs = fs.createReadStream("./stream.txt");
// let ws = fs.createWriteStream("./newStream.txt", { flags: "a" });

// rs.on("data", (data) => {
//     console.log(data);
//     //true->缓存区可用 false->缓存区已满
//     if (!ws.write()) {
//         rs.pause();
//     }
// });
// //操作系统缓存区中的数据已全部输出  触发
// ws.on("drain", () => {
//     rs.resume();
// });
// rs.on("end", () => {
//     console.log("end");
// });

//************************************************************************** */
//流的方式读取    
// const http = require("http");
// const request = require("request");
// let server = http.createServer((req, res) => {
//     request('https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=278308933bdbb6fd3156ed74684dc07d/42a98226cffc1e17fcdb30594890f603738de976.jpg')
//         .pipe(res);
// });
// server.listen(3000);

//在本地  读取1图片文件，写到2.png，pipe智能防止“爆仓”
// fs.createReadStream("./1.png").pipe(fs.createWriteStream("./2.png"))

//*************************************************************************** */
//本地
// let rs = fs.createReadStream("./stream.txt");
// let ws = fs.createWriteStream("./newStream.txt", { flags: "a" });
// rs.pipe(ws);

//************************************************************************** */
//文件监控
//demo: 当css文件变化时，匹配文件中css3属性，前面加  -moz  等
// fs.watch("./stream.txt", (eventType, fileName) => {
//     console.log(eventType, fileName);
//     fs.readFile("./" + fileName, "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         fs.writeFileSync("newStream2.txt", data);
//     })
// })