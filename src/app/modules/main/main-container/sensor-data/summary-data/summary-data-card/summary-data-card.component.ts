import { Component, input } from '@angular/core';
import { RegisteredSensor } from '../../../../../../shared/models/registered-sensor.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import {
    Measurement,
    MeasurementService,
} from '../../../../../../http/devices/measurement.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, filter, Observable, startWith, switchMap } from 'rxjs';
import { SensorDataFormService } from '../../sensor-data-form.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../../../../../core/services/auth.service';

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
    ],
    templateUrl: './summary-data-card.component.html',
})
export class SummaryDataCardComponent {
    device = input<RegisteredSensor>();
    minMaxMeasurements$: Observable<Measurement[]>;

    constructor(
        private readonly _sensorDataFormService: SensorDataFormService,
        private readonly _measurementService: MeasurementService,
        public readonly authService: AuthService,
    ) {
        this.minMaxMeasurements$ = combineLatest([
            toObservable(this.device).pipe(filter((device) => device != null)),
            this._sensorDataFormService.range.valueChanges.pipe(
                startWith(this._sensorDataFormService.range.value),
                filter(() => this._sensorDataFormService.range.valid),
            ),
        ]).pipe(
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
        );
    }
}
