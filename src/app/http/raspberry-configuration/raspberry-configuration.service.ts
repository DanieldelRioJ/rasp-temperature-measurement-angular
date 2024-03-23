import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';
import { map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RaspberryConfigurationService {
    appName = signal<string>('Raspberry Configuration');

    constructor(private readonly _httpClient: HttpClient) {}

    getNotificationEmails() {
        return this._httpClient
            .get<{ email: string }[]>(`${backUrl}/notification-emails`)
            .pipe(map((emails) => emails.map(({ email }) => email)));
    }

    addNotificationEmail(email: string) {
        return this._httpClient.post(
            `${backUrl}/notification-emails/${email}`,
            null,
        );
    }

    deleteNotificationEmail(email: string) {
        return this._httpClient.delete(
            `${backUrl}/notification-emails/${email}`,
        );
    }

    setName(name: string) {
        return this._httpClient
            .post(`${backUrl}/rasp-configuration/${name}`, null)
            .pipe(tap(() => this.appName.set(name)));
    }

    getName() {
        return this._httpClient
            .get<{ name: string }>(`${backUrl}/rasp-configuration`)
            .pipe(tap(({ name }) => this.appName.set(name)));
    }
}
