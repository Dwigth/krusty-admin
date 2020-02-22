export interface IDAO {
    Insert(data?: any): void;
    BatchInsert(data?: Array<any>): void;
    Update(data?: any): void;
    BatchUpdate(data?: Array<any>): void;
    Delete(data?: any | Array<any>): void;
    Get(data?: any | Array<any>): any;
    GetAll(data?: any | Array<any>): void;
}
export interface IWhere {
    RawQuery?: string;
    And?: IWhere;
    Or?: IWhere;
    Key?: string;
    Value?: number | string;
    Operator?: string;
    Properties?: Array<string>;

}