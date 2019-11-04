"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hbs_1 = __importDefault(require("hbs"));
var menu_routes_1 = require("../../../routes/menu-routes");
/**
 * =======================================================
 *
 * Arreglo de objetos que contienen helpers personalizados
 * por modulo (carpeta).
 *
 * =======================================================
 */
exports.MenuHelperManager = [
    {
        name: 'main_menu_builder',
        function: function () {
            var menu = '';
            var length = menu_routes_1.MenuItems.length;
            for (var i = 0; i < length; i++) {
                var item = menu_routes_1.MenuItems[i];
                if (item.children == undefined) {
                    var itemElem = "\n                    <li class=\"nav-item\">\n                        <a href=\"" + item.route + "\" class=\"nav-link\">\n                            <i class=\"" + item.icon + "\">\n                        </i> " + item.name + "</a>\n                    </li>\n                    ";
                    menu += itemElem;
                }
                else {
                    var itemElem = "\n                    <li class=\"nav-item\">\n                        <a href=\"javascript:void(0)\" class=\"nav-link\" data-toggle=\"dropdown\">\n                            <i class=\"" + item.icon + "\"></i>\n                            " + item.name + "\n                        </a>\n                        <div class=\"dropdown-menu dropdown-menu-arrow\">\n                        ";
                    for (var j = 0; j < item.children.length; j++) {
                        var child = item.children[j];
                        itemElem +=
                            "<a href=\"" + child.route + "\" class=\"dropdown-item \">" + child.name + "</a>";
                    }
                    itemElem += ' </div></li>';
                    menu += itemElem;
                }
            }
            return new hbs_1.default.handlebars.SafeString(menu);
        }
    },
    {
        name: 'user_menu_builder',
        function: function () {
            var menu = '';
            var length = menu_routes_1.ProfileMenuItems.length;
            for (var i = 0; i < length; i++) {
                var item = menu_routes_1.ProfileMenuItems[i];
                //Aqui irá cualquier excepción para mostrar la cuenta de las notificaciones
                var itemElem = "\n                    <a class=\"dropdown-item\" href=\"" + item.route + "\">";
                if (item.notification) {
                    itemElem += "\n                        <span class=\"float-right\"><span class=\"badge badge-" + item.notification.color + "\">" + item.notification.count + "</span></span>";
                }
                itemElem += "\n                        <i class=\"dropdown-icon " + item.icon + "\"></i> " + item.name + "\n                    </a>\n                    ";
                menu += itemElem;
            }
            return new hbs_1.default.handlebars.SafeString(menu);
        }
    }
];
