import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';

export interface Measurement {
    temperature: number;
    date: number;
    sensor_id: string;
}

@Injectable({
    providedIn: 'root',
})
export class MeasurementService {
    constructor(private readonly _httpClient: HttpClient) {}

    getMeasurementByDeviceAndDates(
        sensorId: string,
        start_date: number,
        end_date: number,
    ) {
        const httpParams = new HttpParams({
            fromObject: { start_date, end_date },
        });
        return this._httpClient.get<Measurement[]>(
            `${backUrl}/registered-temperature-sensors/${sensorId}/measurement`,
            { params: httpParams },
        );
    }

    getMaxByDeviceAndDates(
        sensorId: string,
        start_date: number,
        end_date: number,
    ) {
        const httpParams = new HttpParams({
            fromObject: { start_date, end_date },
        });
        return this._httpClient.get<Measurement>(
            `${backUrl}/registered-temperature-sensors/${sensorId}/max`,
            { params: httpParams },
        );
    }

    getMinByDeviceAndDates(
        sensorId: string,
        start_date: number,
        end_date: number,
    ) {
        const httpParams = new HttpParams({
            fromObject: { start_date, end_date },
        });
        return this._httpClient.get<Measurement>(
            `${backUrl}/registered-temperature-sensors/${sensorId}/max`,
            { params: httpParams },
        );
    }
}
