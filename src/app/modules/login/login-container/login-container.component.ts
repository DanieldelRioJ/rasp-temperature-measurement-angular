import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {
    MatFormField,
    MatLabel,
    MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-login-container',
    standalone: true,
    imports: [
        MatCard,
        MatPrefix,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatButton,
        RouterOutlet,
    ],
    templateUrl: './login-container.component.html',
})
export class LoginContainerComponent {}
