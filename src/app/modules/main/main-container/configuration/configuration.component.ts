import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RaspberryConfigurationComponent } from './raspberry-configuration/raspberry-configuration.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-configuration',
    standalone: true,
    imports: [
        RouterLink,
        MatButton,
        MatIcon,
        RaspberryConfigurationComponent,
        ManageUsersComponent,
        UserConfigurationComponent,
        NgIf,
    ],
    templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
    constructor(public readonly authService: AuthService) {}
}
