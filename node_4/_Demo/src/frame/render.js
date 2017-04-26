const fs = require("fs");

const render = (fileName, res) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.end(data);
    });
}

module.exports = render;