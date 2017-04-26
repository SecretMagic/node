const url = require("url");
const render = require("../frame/render.js");
const userObj = { user: "111", code: "222" };

const formRouter = (req, res) => {
    let obj = url.parse(req.url, true);
    let { user, code } = obj.query;
    if (user === userObj.user && code === userObj.code) {
        render("./src/success.html", res);
    } else {
        render("./src/failed.html", res);
    }
}

module.exports = formRouter;