import { Query } from "mysql";

export interface QueryValues<T> {
    QueryValues: Query;
    DataValues: T;
}
