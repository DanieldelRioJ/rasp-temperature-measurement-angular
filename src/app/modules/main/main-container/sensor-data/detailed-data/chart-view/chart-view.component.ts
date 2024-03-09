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
                const data = [
                    { year: 2010, count: 10 },
                    { year: 2011, count: 20 },
                    { year: 2012, count: 15 },
                    { year: 2013, count: 25 },
                    { year: 2014, count: 22 },
                    { year: 2015, count: 30 },
                    { year: 2016, count: 28 },
                ];
                const myData = this.measurements();
                if (myData == null) {
                    return;
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
                        scales: {
                            x: {
                                type: 'time',
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
