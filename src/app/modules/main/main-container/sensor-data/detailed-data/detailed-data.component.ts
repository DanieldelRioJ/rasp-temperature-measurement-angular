import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { RegisteredSensor } from '../../../../../shared/models/registered-sensor.model';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    Measurement,
    MeasurementService,
} from '../../../../../http/devices/measurement.service';
import { filter, switchMap } from 'rxjs';
import {
    MatButtonToggle,
    MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ChartViewComponent } from './chart-view/chart-view.component';

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
    ],
    templateUrl: './detailed-data.component.html',
})
export class DetailedDataComponent implements OnInit {
    device = input<RegisteredSensor>();
    device$ = toObservable(this.device);
    private _destroyRef = inject(DestroyRef);
    measurementList?: Measurement[];

    viewMode = 'chart';

    constructor(private readonly _measurementService: MeasurementService) {}

    ngOnInit(): void {
        this.device$
            .pipe(
                filter((device): device is RegisteredSensor => device != null),
                switchMap((device) =>
                    this._measurementService.getMeasurementByDeviceAndDates(
                        device.id,
                        new Date().getTime() / 100000 - 100,
                        new Date().getTime() / 1000,
                    ),
                ),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((measurements) => (this.measurementList = measurements));
    }
}
