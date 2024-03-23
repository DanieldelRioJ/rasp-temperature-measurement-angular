import { Component, DestroyRef, effect, inject } from '@angular/core';
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
import {
    MatChipGrid,
    MatChipInput,
    MatChipInputEvent,
    MatChipRemove,
    MatChipRow,
} from '@angular/material/chips';
import { RaspberryConfigurationService } from '../../../../../http/raspberry-configuration/raspberry-configuration.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../../shared/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-raspberry-configuration',
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
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatChipRemove,
    ],
    templateUrl: './raspberry-configuration.component.html',
})
export class RaspberryConfigurationComponent {
    emails: string[] = [];
    private _destroyRef = inject(DestroyRef);

    raspberryConfigurationForm = this._formBuilder.nonNullable.group({
        name: new FormControl<string>('', [
            Validators.required,
            Validators.minLength(4),
        ]),
    });
    formControl: FormControl = new FormControl<string>('', [Validators.email]);

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _raspberryConfigurationService: RaspberryConfigurationService,
        private readonly _notificationService: NotificationService,
    ) {
        this.getEmails();
        effect(() => {
            this.raspberryConfigurationForm.setValue({
                name: this._raspberryConfigurationService.appName(),
            });
        });
    }

    changeAppName() {
        this._raspberryConfigurationService
            .setName(this.raspberryConfigurationForm.value.name!)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._notificationService.send(
                        'Nombre cambiado con éxito',
                        null,
                        'success',
                    );
                },
                error: (error: HttpErrorResponse) => {
                    this._notificationService.send(
                        'Ha ocurrido un error intentando borrar el email de la lista de emails de notificación',
                        error.message,
                        'error',
                    );
                },
            });
    }

    removeEmail(keyword: string) {
        const index = this.emails.indexOf(keyword);
        if (index >= 0) {
            this._raspberryConfigurationService
                .deleteNotificationEmail(this.emails[index])
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe({
                    next: () => {
                        this.emails.splice(index, 1);
                    },
                    error: (error: HttpErrorResponse) => {
                        this._notificationService.send(
                            'Ha ocurrido un error intentando borrar el email de la lista de emails de notificación',
                            error.message,
                            'error',
                        );
                    },
                });
        }
    }

    getEmails() {
        this._raspberryConfigurationService
            .getNotificationEmails()
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: (emails) => {
                    this.emails = emails;
                },
                error: (error: HttpErrorResponse) => {
                    this._notificationService.send(
                        'Ha ocurrido un error intentando obtener el listado de emails de notificación',
                        error.message,
                        'error',
                    );
                },
            });
    }

    addEmail(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our keyword
        this._raspberryConfigurationService
            .addNotificationEmail(value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this.emails.push(value);
                    // Clear the input value
                    event.chipInput!.clear();
                },
                error: (error: HttpErrorResponse) => {
                    this._notificationService.send(
                        'Ha ocurrido un error intentando añadir el email al listado de emails de notificacion',
                        error.message,
                        'error',
                    );
                },
            });
    }
}
