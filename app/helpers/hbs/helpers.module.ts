import hbs from 'hbs';
import { IHelperModel } from '../../interfaces/helpers/helper';
import { LoginHelperManager } from './auth/login';
import { environments } from '../../../environments/enviroment';
import { AdminnHelperManager } from './home/admin-keys';
import { MenuHelperManager } from './home/menu';
import { GeneralHelperManager } from './home/general';
import { MatildeHelperManager } from './home/matilde';

export class HelpersModule {
    Modules: IHelperModel[] = [];

    constructor() {
        this.Modules = this.Modules.concat(
            LoginHelperManager,
            AdminnHelperManager,
            MenuHelperManager,
            GeneralHelperManager,
            MatildeHelperManager
        );
        for (let i = 0; i < this.Modules.length; i++) {
            const module = this.Modules[i];
            hbs.registerHelper(module.name, <any>module.function);
        }
        if (environments.logging) {
            console.log('Helpers cargados');
        }
    }
} 