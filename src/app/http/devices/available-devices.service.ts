import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';

export interface AvailableDevice {
    id: string;
    temperature: number;
}

@Injectable({
    providedIn: 'root',
})
export class AvailableDevicesService {
    constructor(private readonly _httpClient: HttpClient) {}

    getAvailableDevices() {
        return this._httpClient.get<{
            sensors: AvailableDevice[];
        }>(`${backUrl}/available-temperature-sensors`);
    }
}
