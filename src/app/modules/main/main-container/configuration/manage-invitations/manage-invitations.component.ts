import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
    Invitation,
    RegisterService,
} from '../../../../../http/register.service';
import { FormErrorDirective } from '../../../../../shared/form-error/form-error.directive';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../../shared/notification/notification.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ConfirmationDialogComponent } from '../../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

interface InvitationItem extends Invitation {
    deleting?: boolean;
}

@Component({
    selector: 'app-manage-invitations',
    standalone: true,
    imports: [
        FormErrorDirective,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatProgressSpinner,
        MatSelect,
        ReactiveFormsModule,
        MatTable,
        AsyncPipe,
        MatTableModule,
        MatSortHeader,
        MatSort,
        MatIcon,
        MatIconButton,
        MatTooltip,
    ],
    templateUrl: './manage-invitations.component.html',
})
export class ManageInvitationsComponent implements OnInit {
    dataSource: InvitationItem[] = [];
    columns = ['email', 'role', 'actions'];

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
        private readonly _matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    private loadData() {
        this._registerService
            .getInvitations()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((invitations) => (this.dataSource = invitations));
    }

    invite() {
        this.loadingInvitation = true;
        const inviteValue = this.inviteForm.value;
        this._registerService
            .invite(inviteValue.email!, inviteValue.role!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this.loadingInvitation = false;
                    this.loadData();
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

    deleteInvitation(invitation: InvitationItem) {
        this._matDialog
            .open(ConfirmationDialogComponent, {
                data: '¿Seguro que quieres eliminar la invitación?',
                width: '400px',
            })
            .afterClosed()
            .pipe(
                filter((response) => response),
                switchMap(() => {
                    invitation.deleting = true;
                    return this._registerService
                        .deleteInvitation(invitation.email)
                        .pipe(
                            tap({
                                next: () => {
                                    invitation.deleting = false;
                                    this.loadData();
                                    this._notificationService.send(
                                        'Invitacion eliminada',
                                        null,
                                        'success',
                                    );
                                },
                                error: (error) => {
                                    invitation.deleting = false;
                                    this._notificationService.send(
                                        'Ha ocurrido un eliminando el usuario',
                                        null,
                                        'error',
                                    );
                                },
                            }),
                        );
                }),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();
    }
}
