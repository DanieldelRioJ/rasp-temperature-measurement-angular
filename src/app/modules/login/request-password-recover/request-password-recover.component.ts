import { Component, DestroyRef, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
    MatFormField,
    MatLabel,
    MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { LoginService } from '../../../http/login/login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-request-password-recover',
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
    ],
    templateUrl: './request-password-recover.component.html',
})
export class RequestPasswordRecoverComponent {
    requestPasswordRecoverForm = this._formBuilder.group({
        email: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(1),
            Validators.email,
        ]),
    });

    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _loginService: LoginService,
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router,
    ) {}

    requestPasswordRecover() {
        const passwordChangeValue = this.requestPasswordRecoverForm.value;
        this._loginService
            .requestPasswordChange(passwordChangeValue.email!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._router.navigateByUrl('/login/password-recover');
            });
    }
}
