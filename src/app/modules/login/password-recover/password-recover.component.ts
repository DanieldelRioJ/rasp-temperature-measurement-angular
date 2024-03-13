import { Component, DestroyRef, inject, Input } from '@angular/core';
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
import { FormErrorDirective } from '../../../shared/form-error/form-error.directive';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { LoginService } from '../../../http/login/login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../shared/notification/notification.service';

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
        FormErrorDirective,
        MatError,
        ReactiveFormsModule,
    ],
    templateUrl: './password-recover.component.html',
})
export class PasswordRecoverComponent {
    @Input() email?: string;

    private _destroyRef = inject(DestroyRef);

    passwordRecoverForm = this._formBuilder.nonNullable.group({
        recovery_token: new FormControl<string>('', [Validators.required]),
        new_password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
    });

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _loginService: LoginService,
        private readonly _notificationService: NotificationService,
        private readonly _router: Router,
    ) {}

    changePassword() {
        const formValue = this.passwordRecoverForm.value;
        this._loginService
            .changePassword(
                this.email!,
                formValue.recovery_token!,
                formValue.new_password!,
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._notificationService.send(
                        `Contraseña cambiada con éxito`,
                        null,
                        'success',
                    );
                    this._router.navigateByUrl('/');
                },
                error: () => {
                    this._notificationService.send(
                        `Ha ocurrido un error cambiando la contraseña`,
                        null,
                        'error',
                    );
                },
            });
    }
}
