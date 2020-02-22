import { IWhere } from "../interfaces/dao";

export class QueryModeler {
    protected Whereify(Where: IWhere): string {
        let sql = 'WHERE ';
        if (Where.RawQuery) {
            return sql + Where.RawQuery;
        } else {
            sql += `${Where.Key} ${this.GetOperator(Where)} ${Where.Value}`;
            if (Where.And) {
                let and = Where.And;
                sql += ` AND ${and.Key} ${this.GetOperator(and)} ${and.Value} `
            }
            if (Where.Or) {
                let or = Where.Or;
                sql += ` OR ${or.Key} ${this.GetOperator(or)} ${or.Value} `
            }
            return sql;
        }
    }



    private GetOperator(where: IWhere) {
        return (where.Operator != undefined) ? where.Operator : '=';
    }
}