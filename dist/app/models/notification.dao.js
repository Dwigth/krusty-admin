"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dao_1 = require("./dao");
var NotificationDAO = /** @class */ (function (_super) {
    __extends(NotificationDAO, _super);
    function NotificationDAO() {
        var _this = _super.call(this) || this;
        _this.tablename = 'notificaciones';
        return _this;
    }
    return NotificationDAO;
}(dao_1.DAO));
exports.NotificationDAO = NotificationDAO;
