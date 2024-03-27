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
import { MatOption, MatSelect } from '@angular/material/select';
import { RegisterService } from '../../../../../http/register.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../../shared/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageUsersListComponent } from './manage-users-list/manage-users-list.component';
import { MatTable } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-manage-users',
    standalone: true,
    imports: [
        FormErrorDirective,
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatSelect,
        MatOption,
        ManageUsersListComponent,
        MatTable,
        MatProgressSpinner,
    ],
    templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent {
    inviteForm = this._formBuilder.nonNullable.group({
        email: new FormControl<string>('', [
            Validators.required,
            Validators.email,
        ]),
        role: new FormControl<string>('user', [Validators.required]),
    });
    loadingInvitation = false;

    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _registerService: RegisterService,
        private readonly _notificationService: NotificationService,
    ) {}

    invite() {
        this.loadingInvitation = true;
        const inviteValue = this.inviteForm.value;
        this._registerService
            .invite(inviteValue.email!, inviteValue.role!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this.loadingInvitation = false;
                    this._notificationService.send(
                        `Invitación enviada`,
                        null,
                        'success',
                    );
                },
                error: (httpErrorResponse: HttpErrorResponse) => {
                    this.loadingInvitation = false;
                    if (httpErrorResponse.status == 409) {
                        this._notificationService.send(
                            `El usuario ya está invitado o está registrado`,
                            null,
                            'error',
                        );
                    } else {
                        this._notificationService.send(
                            `Ha ocurrido un error al enviar la invitación`,
                            null,
                            'error',
                        );
                    }
                },
            });
    }
}
