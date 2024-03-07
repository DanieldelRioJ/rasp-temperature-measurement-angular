import { Component, OnInit } from '@angular/core';
import { RegisteredDevicesService } from '../../../../http/devices/registered-devices.service';
import { RegisteredSensor } from '../../../../shared/models/registered-sensor.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-sensor-data',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './sensor-data.component.html',
})
export class SensorDataComponent implements OnInit {
    devices: RegisteredSensor[] = [];

    constructor(
        private readonly _registeredDevicesService: RegisteredDevicesService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this._registeredDevicesService
            .getRegisteredDevices()
            .subscribe((devices) => (this.devices = devices));
    }
}
