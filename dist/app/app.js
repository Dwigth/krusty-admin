"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
var App = /** @class */ (function () {
    function App() {
        var myServer = new server_1.Server();
    }
    return App;
}());
var myApp = new App();
