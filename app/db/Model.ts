import moment, { Moment } from 'moment-timezone';
moment.tz("America/Mexico_City");
moment.locale('es');
export class Model {
    moment: Moment;
    constructor() {
        this.moment = moment();
    }
    CallMoment(params?: any) {
        if (params) {
            return moment(params);
        } else {
            return moment();
        }
    }
}