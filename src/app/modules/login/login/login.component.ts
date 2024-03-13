import { Component, DestroyRef, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
    MatError,
    MatFormField,
    MatLabel,
    MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../http/login/login.service';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../shared/notification/notification.service';
import { FormErrorDirective } from '../../../shared/form-error/form-error.directive';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatPrefix,
        RouterLink,
        ReactiveFormsModule,
        FormErrorDirective,
        MatError,
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loginForm = this._formBuilder.group({
        email: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(1),
            Validators.email,
        ]),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
    });

    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _loginService: LoginService,
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _notificationService: NotificationService,
    ) {}

    login() {
        const loginValue = this.loginForm.value;
        this._loginService
            .login(loginValue.email!, loginValue.password!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._router.navigateByUrl('/');
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        this._notificationService.send(
                            'Usuario o contraseña incorrectos',
                            null,
                            'error',
                        );
                    } else if (error.status === 400) {
                        this._notificationService.send(
                            'Formato incorrecto',
                            null,
                            'error',
                        );
                    }
                },
            });
    }
}
