"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryModeler = /** @class */ (function () {
    function QueryModeler() {
    }
    QueryModeler.prototype.Whereify = function (Where) {
        var sql = 'WHERE ';
        if (Where.RawQuery) {
            return sql + Where.RawQuery;
        }
        else {
            sql += Where.Key + " " + this.GetOperator(Where) + " " + Where.Value;
            if (Where.And) {
                var and = Where.And;
                sql += " AND " + and.Key + " " + this.GetOperator(and) + " " + and.Value + " ";
            }
            if (Where.Or) {
                var or = Where.Or;
                sql += " OR " + or.Key + " " + this.GetOperator(or) + " " + or.Value + " ";
            }
            return sql;
        }
    };
    QueryModeler.prototype.GetOperator = function (where) {
        return (where.Operator != undefined) ? where.Operator : '=';
    };
    return QueryModeler;
}());
exports.QueryModeler = QueryModeler;
