export interface IMenuItem {
    name: string;
    icon?: string;
    route: string;
    children?: IMenuItem[];
    notification?: INotificationMenuItem;
}
export interface INotificationMenuItem {
    count: number;
    color: string;
}
