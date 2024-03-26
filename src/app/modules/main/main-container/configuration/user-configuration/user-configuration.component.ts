import { Component, DestroyRef, inject } from '@angular/core';
import { FormErrorDirective } from '../../../../../shared/form-error/form-error.directive';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../../../../http/users/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../../shared/notification/notification.service';

@Component({
    selector: 'app-user-configuration',
    standalone: true,
    imports: [
        FormErrorDirective,
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
    ],
    templateUrl: './user-configuration.component.html',
})
export class UserConfigurationComponent {
    private _destroyRef = inject(DestroyRef);

    passwordEmailChangeForm = this._formBuilder.nonNullable.group({
        new_email: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.email],
        }),
        new_password: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.minLength(8)],
        }),
    });

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _userService: UserService,
        private readonly _notificationService: NotificationService,
    ) {}

    changePasswordOrEmail() {
        this._userService
            .changeEmailOrPassword(this.passwordEmailChangeForm.getRawValue())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._notificationService.send(
                        'Email y/o password cambiados',
                        null,
                        'success',
                    );
                },
                error: (error) => {
                    this._notificationService.send(
                        'Error cambiando email y/o password',
                        null,
                        'error',
                    );
                },
            });
    }
}
