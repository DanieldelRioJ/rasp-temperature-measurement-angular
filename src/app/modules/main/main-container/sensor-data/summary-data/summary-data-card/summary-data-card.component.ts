import { Component, DestroyRef, inject, input } from '@angular/core';
import { RegisteredSensor } from '../../../../../../shared/models/registered-sensor.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import {
    Measurement,
    MeasurementService,
} from '../../../../../../http/devices/measurement.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    combineLatest,
    filter,
    Observable,
    startWith,
    switchMap,
    tap,
} from 'rxjs';
import { SensorDataFormService } from '../../sensor-data-form.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../../../../../core/services/auth.service';
import { RegisteredDevicesService } from '../../../../../../http/devices/registered-devices.service';
import { NotificationService } from '../../../../../../shared/notification/notification.service';
import { SensorDataComponent } from '../../sensor-data.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { EditSensorComponent } from '../../../edit-sensor/edit-sensor.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-summary-data-card',
    standalone: true,
    imports: [
        DecimalPipe,
        AsyncPipe,
        NgIf,
        MatTooltip,
        DatePipe,
        MatIcon,
        MatIconButton,
        MatProgressSpinner,
    ],
    templateUrl: './summary-data-card.component.html',
})
export class SummaryDataCardComponent {
    device = input<RegisteredSensor>();
    minMaxMeasurements$: Observable<Measurement[]>;
    loading: boolean = false;
    private readonly _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _sensorDataFormService: SensorDataFormService,
        private readonly _measurementService: MeasurementService,
        private readonly _registeredDeviceService: RegisteredDevicesService,
        private readonly _matDialog: MatDialog,
        private readonly _notificationService: NotificationService,
        private readonly _sensorDataComponent: SensorDataComponent,
        public readonly authService: AuthService,
    ) {
        this.minMaxMeasurements$ = combineLatest([
            toObservable(this.device).pipe(filter((device) => device != null)),
            this._sensorDataFormService.range.valueChanges.pipe(
                startWith(this._sensorDataFormService.range.value),
                filter(() => this._sensorDataFormService.range.valid),
            ),
        ]).pipe(
            tap({
                next: () => (this.loading = true),
                error: () => (this.loading = false),
            }),
            switchMap(([device, range]) => {
                const endDate = range.end;
                endDate?.setHours(23, 59, 59, 999);
                return combineLatest([
                    this._measurementService.getMaxByDeviceAndDates(
                        device!.id,
                        range.start?.getTime() != null
                            ? Math.round(range.start?.getTime() / 1000)
                            : undefined,
                        endDate?.getTime() != null
                            ? Math.round(endDate?.getTime() / 1000)
                            : undefined,
                    ),
                    this._measurementService.getMinByDeviceAndDates(
                        device!.id,
                        range.start?.getTime() != null
                            ? Math.round(range.start?.getTime() / 1000)
                            : undefined,
                        endDate?.getTime() != null
                            ? Math.round(endDate?.getTime() / 1000)
                            : undefined,
                    ),
                ]);
            }),
            tap({
                next: () => (this.loading = false),
                error: () => (this.loading = false),
            }),
        );
    }

    deleteDevice() {
        this._matDialog
            .open(ConfirmationDialogComponent, {
                data: '¿Seguro que quieres eliminar el sensor?',
                width: '400px',
            })
            .afterClosed()
            .pipe(
                filter((response) => response),
                switchMap(() =>
                    this._registeredDeviceService
                        .deleteSensorById(this.device()!.id)
                        .pipe(
                            tap({
                                next: () => {
                                    this._sensorDataComponent.getData();
                                    this._notificationService.send(
                                        'Dispositivo eliminado con éxito',
                                        null,
                                        'success',
                                    );
                                },
                                error: () => {
                                    this._notificationService.send(
                                        'Ha ocurrido un error eliminando el dispositivo',
                                        null,
                                        'error',
                                    );
                                },
                            }),
                        ),
                ),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();
    }

    editDevice() {
        this._matDialog
            .open(EditSensorComponent, {
                data: this.device(),
                width: '400px',
            })
            .afterClosed()
            .pipe(
                filter((result) => result),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(() => {
                this._sensorDataComponent.getData();
            });
    }
}
