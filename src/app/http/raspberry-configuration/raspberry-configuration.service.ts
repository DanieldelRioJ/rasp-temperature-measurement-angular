import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RaspberryConfigurationService {
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
}
