import { Component, input } from '@angular/core';
import { RegisteredSensor } from '../../../../../shared/models/registered-sensor.model';
import { MeasurementService } from '../../../../../http/devices/measurement.service';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-summary-data',
    standalone: true,
    imports: [MatCard, MatIcon],
    templateUrl: './summary-data.component.html',
})
export class SummaryDataComponent {
    devices = input<RegisteredSensor[]>();

    constructor(
        private readonly _measurementServiceDevice: MeasurementService,
    ) {}
}
