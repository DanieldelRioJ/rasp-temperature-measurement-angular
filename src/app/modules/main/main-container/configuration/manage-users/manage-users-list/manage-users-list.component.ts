import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { User, UserService } from '../../../../../../http/users/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService } from '../../../../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { NotificationService } from '../../../../../../shared/notification/notification.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from '../../../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

interface UserItem extends User {
    changingRole?: boolean;
    deleting?: boolean;
}

@Component({
    selector: 'app-manage-users-list',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatIconButton,
        MatIcon,
        MatTooltip,
        NgIf,
        MatProgressSpinner,
    ],
    templateUrl: './manage-users-list.component.html',
})
export class ManageUsersListComponent implements OnInit {
    users: UserItem[] = [];
    displayedColumns: string[] = ['email', 'role', 'action'];
    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _userService: UserService,
        private readonly _notificationService: NotificationService,
        public readonly authService: AuthService,
        private readonly _matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this._getData();
    }

    reload() {}

    deleteUser(user: UserItem) {
        this._matDialog
            .open(ConfirmationDialogComponent, {
                data: '¿Seguro que quieres eliminar el usuario  ?',
                width: '400px',
            })
            .afterClosed()
            .pipe(
                filter((response) => response),
                switchMap(() => {
                    user.deleting = true;
                    return this._userService.deleteUser(user).pipe(
                        tap({
                            next: () => {
                                user.deleting = false;
                                this._getData();
                                this._notificationService.send(
                                    'Usuario eliminado',
                                    null,
                                    'success',
                                );
                            },
                            error: (error) => {
                                user.deleting = false;
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

    private _getData() {
        this._userService
            .getUsers()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((users) => (this.users = users));
    }

    changeRole(user: UserItem, role: string) {
        user.changingRole = true;
        this._userService
            .changeRole(user, role)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    user.changingRole = false;
                    this._getData();
                    this._notificationService.send(
                        'Rol cambiado',
                        null,
                        'success',
                    );
                },
                error: (error) => {
                    user.changingRole = false;
                    this._notificationService.send(
                        'Ha ocurrido un error cambiando el rol',
                        null,
                        'error',
                    );
                },
            });
    }
}
