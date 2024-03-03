import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
    MatFormField,
    MatLabel,
    MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-password-recover',
    standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatPrefix,
        RouterLink,
    ],
    templateUrl: './password-recover.component.html',
})
export class PasswordRecoverComponent {}
