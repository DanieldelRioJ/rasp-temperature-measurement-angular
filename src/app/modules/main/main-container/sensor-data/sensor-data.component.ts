import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { RegisteredDevicesService } from '../../../../http/devices/registered-devices.service';
import { RegisteredSensor } from '../../../../shared/models/registered-sensor.model';
import { DatePipe } from '@angular/common';
import { Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SummaryDataComponent } from './summary-data/summary-data.component';
import { DetailedDataComponent } from './detailed-data/detailed-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { SensorDataFormService } from './sensor-data-form.service';

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
    ],
    providers: [SensorDataFormService],
    templateUrl: './sensor-data.component.html',
})
export class SensorDataComponent implements OnInit {
    @Input() reload$?: Observable<void>;
    devices: RegisteredSensor[] = [];
    range = this.sensorDataFormService.range;
    private _destroyRef = inject(DestroyRef);

    constructor(
        private readonly _registeredDevicesService: RegisteredDevicesService,
        public readonly sensorDataFormService: SensorDataFormService,
    ) {}

    ngOnInit(): void {
        this.reload$
            ?.pipe(startWith(null), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.getData());
    }

    getData() {
        this._registeredDevicesService
            .getRegisteredDevices()
            .subscribe((devices) => (this.devices = devices));
    }
}
