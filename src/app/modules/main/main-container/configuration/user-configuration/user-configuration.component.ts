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
        new_email: new FormControl<string>('', [Validators.email]),
        new_password: new FormControl<string>('', [Validators.minLength(8)]),
    });

    constructor(private readonly _formBuilder: FormBuilder) {}

    changePasswordOrEmail() {}
}
