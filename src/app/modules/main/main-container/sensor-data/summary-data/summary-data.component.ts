import { Component, input } from '@angular/core';
import { RegisteredSensor } from '../../../../../shared/models/registered-sensor.model';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { SummaryDataCardComponent } from './summary-data-card/summary-data-card.component';

@Component({
    selector: 'app-summary-data',
    standalone: true,
    imports: [MatCard, MatIcon, DecimalPipe, SummaryDataCardComponent],
    templateUrl: './summary-data.component.html',
})
export class SummaryDataComponent {
    devices = input<RegisteredSensor[]>();

    constructor() {}
}
