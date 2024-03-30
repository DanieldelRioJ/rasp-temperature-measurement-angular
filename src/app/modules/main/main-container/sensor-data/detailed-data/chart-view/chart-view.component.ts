import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    Injector,
    Input,
    input,
    ViewChild,
} from '@angular/core';
import { Measurement } from '../../../../../../http/devices/measurement.service';
import Chart from 'chart.js/auto';
import { RegisteredSensor } from '../../../../../../shared/models/registered-sensor.model';
import 'chartjs-adapter-moment';

@Component({
    selector: 'app-chart-view',
    standalone: true,
    imports: [],
    templateUrl: './chart-view.component.html',
})
export class ChartViewComponent implements AfterViewInit {
    @ViewChild('chart') chartCanvas!: ElementRef;
    @Input() device?: RegisteredSensor;
    measurements = input<Measurement[]>();
    myCHart?: Chart;

    constructor(private readonly injector: Injector) {}

    ngAfterViewInit(): void {
        effect(
            () => {
                const myData = this.measurements();
                if (myData == null) {
                    return;
                }
                let unit: 'hour' | 'day' = 'hour';
                if (
                    myData.length > 0 &&
                    myData[myData.length - 1].date - myData[0].date > 100000
                ) {
                    unit = 'day';
                }
                this.myCHart?.destroy();
                this.myCHart = new Chart(this.chartCanvas.nativeElement, {
                    type: 'line',
                    data: {
                        labels: myData.map((row) => row.date * 1000),
                        datasets: [
                            {
                                label: this.device?.name,
                                data: myData.map((row) => row.temperature),
                            },
                        ],
                    },
                    options: {
                        locale: 'es',
                        spanGaps: false,
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                type: 'time',
                                time: { unit: unit },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });
            },
            { injector: this.injector },
        );
    }
}
