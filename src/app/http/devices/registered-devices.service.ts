import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';
import { RegisteredSensor } from '../../shared/models/registered-sensor.model';

export interface RegisteredSensorCreation {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class RegisteredDevicesService {
    constructor(private readonly _httpClient: HttpClient) {}

    getRegisteredDevices() {
        return this._httpClient.get<RegisteredSensor[]>(
            `${backUrl}/registered-temperature-sensors`,
        );
    }

    addAvailableDevice(registeredSensor: RegisteredSensorCreation) {
        return this._httpClient.post(
            `${backUrl}/registered-temperature-sensors`,
            registeredSensor,
        );
    }

    deleteSensorById(sensorId: string) {
        return this._httpClient.delete(
            `${backUrl}/registered-temperature-sensors/${sensorId}`,
        );
    }

    changeSensorId(oldSensorId: string, newSensorId: string) {
        return this._httpClient.put(
            `${backUrl}/registered-temperature-sensors/${oldSensorId}`,
            { newSensorId },
        );
    }
}
