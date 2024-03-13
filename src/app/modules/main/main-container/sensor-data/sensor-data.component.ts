import { Component, DestroyRef, inject } from '@angular/core';
import { RegisteredDevicesService } from '../../../../http/devices/registered-devices.service';
import { RegisteredSensor } from '../../../../shared/models/registered-sensor.model';
import { DatePipe, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SummaryDataComponent } from './summary-data/summary-data.component';
import { DetailedDataComponent } from './detailed-data/detailed-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { SensorDataFormService } from './sensor-data-form.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-sensor-data',
    standalone: true,
    imports: [
        DatePipe,
        SummaryDataComponent,
        DetailedDataComponent,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatButton,
        MatIcon,
        NgIf,
    ],
    providers: [SensorDataFormService],
    templateUrl: './sensor-data.component.html',
})
export class SensorDataComponent {
    devices: RegisteredSensor[] = [];
    range = this.sensorDataFormService.range;
    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _registeredDevicesService: RegisteredDevicesService,
        public readonly sensorDataFormService: SensorDataFormService,
        public readonly authService: AuthService,
        private readonly _matDialog: MatDialog,
    ) {
        this.getData();
    }

    addSensor() {
        this._matDialog
            .open(AddSensorComponent, {
                width: '400px',
            })
            .afterOpened()
            .pipe(
                filter((result) => result != null),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(() => {
                this.getData();
            });
    }

    getData() {
        this._registeredDevicesService
            .getRegisteredDevices()
            .subscribe((devices) => (this.devices = devices));
    }
}
