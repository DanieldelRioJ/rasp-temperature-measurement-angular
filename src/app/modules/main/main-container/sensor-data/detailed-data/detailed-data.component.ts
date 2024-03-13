import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { RegisteredSensor } from '../../../../../shared/models/registered-sensor.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    Measurement,
    MeasurementService,
} from '../../../../../http/devices/measurement.service';
import { combineLatest, filter, startWith, switchMap } from 'rxjs';
import {
    MatButtonToggle,
    MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {
    MatButton,
    MatIconAnchor,
    MatIconButton,
} from '@angular/material/button';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { SensorDataFormService } from '../sensor-data-form.service';
import { backUrl } from '../../../../../../environments/environment';

@Component({
    selector: 'app-detailed-data',
    standalone: true,
    imports: [
        MatButtonToggleGroup,
        MatButtonToggle,
        MatIcon,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatButton,
        MatIconButton,
        ChartViewComponent,
        MatIconAnchor,
    ],
    templateUrl: './detailed-data.component.html',
})
export class DetailedDataComponent implements OnInit {
    device = input<RegisteredSensor>();
    device$ = toObservable(this.device);
    private _destroyRef = inject(DestroyRef);
    measurementList?: Measurement[];

    viewMode = 'chart';
    backUrl = backUrl;

    constructor(
        private readonly _measurementService: MeasurementService,
        private readonly _sensorDataFormService: SensorDataFormService,
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.device$,
            this._sensorDataFormService.range.valueChanges.pipe(
                startWith(this._sensorDataFormService.range.value),
                filter(() => this._sensorDataFormService.range.valid),
            ),
        ])
            .pipe(
                filter(([device]) => device != null),
                switchMap(([device, range]) => {
                    const endDate = range.end;
                    endDate?.setHours(23, 59, 59, 999);
                    return this._measurementService.getMeasurementByDeviceAndDates(
                        device!.id,
                        range.start?.getTime() != null
                            ? Math.round(range.start?.getTime() / 1000)
                            : undefined,
                        endDate?.getTime() != null
                            ? Math.round(endDate?.getTime() / 1000)
                            : undefined,
                    );
                }),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((measurements) => (this.measurementList = measurements));
    }

    downloadCVS() {
        const startDate =
            (this._sensorDataFormService.range.value.start?.getTime() ?? 0) /
            1000;
        const endDate =
            (this._sensorDataFormService.range.value.end?.getTime() ?? 0) /
            1000;
        window.open(
            `${backUrl}/registered-temperature-sensors/${this.device()?.id}/measurement/csv?start_date=${startDate}&end_date=${endDate}`,
        );
    }
}
