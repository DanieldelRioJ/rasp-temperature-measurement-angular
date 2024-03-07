import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import {
    AvailableDevice,
    AvailableDevicesService,
} from '../../../../http/devices/available-devices.service';
import { NotificationService } from '../../../../shared/notification/notification.service';
import { NotificationSharedModule } from '../../../../shared/notification/notification-shared.module';
import { RegisteredDevicesService } from '../../../../http/devices/registered-devices.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { FormErrorDirective } from '../../../../shared/form-error/form-error.directive';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-add-sensor',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogActions,
        MatDialogContent,
        MatButton,
        MatDialogClose,
        MatIcon,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        MatInput,
        MatIconButton,
        NotificationSharedModule,
        ReactiveFormsModule,
        MatError,
        FormErrorDirective,
    ],
    providers: [NotificationService],
    templateUrl: './add-sensor.component.html',
})
export class AddSensorComponent implements OnInit {
    sensors: AvailableDevice[] = [];
    device = this._fb.nonNullable.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
    });
    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _availableDevicesService: AvailableDevicesService,
        private readonly _registeredDevicesService: RegisteredDevicesService,
        private readonly _notificationService: NotificationService,
        private readonly _matDialogRef: MatDialogRef<any>,
    ) {}

    ngOnInit(): void {
        this.getSensors();
    }

    getSensors() {
        combineLatest([
            this._availableDevicesService.getAvailableDevices(),
            this._registeredDevicesService.getRegisteredDevices(),
        ])
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(([availableSensors, registeredSensors]) => {
                const registeredSensorIdList = registeredSensors.map(
                    (sensor) => sensor.id,
                );
                this.sensors = availableSensors.sensors.filter(
                    (availableSensor) =>
                        !registeredSensorIdList.includes(availableSensor.id),
                );
            });
    }

    registerSensor() {
        const value = this.device.getRawValue();
        this._registeredDevicesService
            .addAvailableDevice(value)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: () => {
                    this._notificationService.send(
                        `Sensor de temperatura "${value.name}" creado con éxito`,
                        null,
                        'success',
                    );
                    this._matDialogRef.close(value);
                },
                error: (httpError: HttpErrorResponse) => {
                    this._notificationService.send(
                        `No se pudo añadir el sensor`,
                        httpError.message,
                        'success',
                    );
                },
            });
    }
}
