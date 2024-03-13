import { Routes } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import { SensorDataComponent } from './main-container/sensor-data/sensor-data.component';
import { ConfigurationComponent } from './main-container/configuration/configuration.component';

export const MAIN_ROUTES: Routes = [
    {
        path: '',
        component: MainContainerComponent,
        children: [
            {
                path: '',
                component: SensorDataComponent,
            },
            {
                path: 'configuration',
                component: ConfigurationComponent,
            },
        ],
    },
];
