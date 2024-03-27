import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';
import { RaspberryConfigurationService } from '../../../http/raspberry-configuration/raspberry-configuration.service';

@Component({
    selector: 'app-main-container',
    standalone: true,
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatButton,
        MatIcon,
        SensorDataComponent,
        RouterLink,
        MatIconButton,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        RouterOutlet,
    ],
    templateUrl: './main-container.component.html',
})
export class MainContainerComponent {
    appName = this._raspberryConfigurationService.appName;

    constructor(
        public readonly authService: AuthService,
        private readonly _raspberryConfigurationService: RaspberryConfigurationService,
    ) {}
}
