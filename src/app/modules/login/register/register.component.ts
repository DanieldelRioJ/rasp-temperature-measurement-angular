import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
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
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { FormErrorDirective } from '../../../shared/form-error/form-error.directive';
import { RegisterService } from '../../../http/register.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../shared/notification/notification.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-register',
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
        MatTooltip,
    ],
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
    @Input() email?: string;
    @Input() token?: string;

    registerForm = this._formBuilder.group({
        email: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(1),
            Validators.email,
        ]),
        token: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(1),
        ]),
        password: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(8),
        ]),
    });

    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _registerService: RegisterService,
        private readonly _notificationService: NotificationService,
        private readonly _router: Router,
    ) {}

    ngOnInit(): void {
        this.registerForm.patchValue({ email: this.email, token: this.token });
    }

    register() {
        const formValue = this.registerForm.value;
        this._registerService
            .register(formValue.email!, formValue.token!, formValue.password!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._notificationService.send(
                        'Cuenta creada con éxito',
                        null,
                        'success',
                    );
                    this._router.navigateByUrl('/');
                },
                error: () => {
                    this._notificationService.send(
                        `Ha ocurrido un fallo en el registro`,
                        null,
                        'error',
                    );
                },
            });
    }
}
