var url = require("url");

function Eps() {
    this._routers = [];
}

Eps.prototype.use = function(route, func) {
    this._routers.push({
        "route": route,
        "func": func
    });
}

Eps.prototype.handle = function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    var layer = null;
    var count = 0;
    while (true) {
        var layer = this._routers[count++];
        if (!layer) { return false };
        if (layer.route === pathName) {
            layer.func(req, res);
            return true;
        }
    }
}

module.exports = Eps;