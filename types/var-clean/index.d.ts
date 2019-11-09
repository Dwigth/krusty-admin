export class clean {
    static cleanBoolean(value: any): boolean | undefined;
    static cleanTruthy(value: any): boolean;
    static cleanInteger(value: any): number | undefined;
    static cleanPositiveInteger(value: any): number | undefined;
    static cleanString(value: any): string | undefined;
    static cleanOnlyString(value: any): string | undefined;
}
export class cleanOrThrow {
    static cleanBoolean(value: any): boolean | Error;
    static cleanTruthy(value: any): boolean;
    static cleanInteger(value: any): number | Error;
    static cleanPositiveInteger(value: any): number | Error;
    static cleanString(value: any): string | Error;
    static cleanOnlyString(value: any): string | Error;
}