import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private readonly _httpClient: HttpClient) {}

    invite(email: string, role: string) {
        return this._httpClient.post(`${backUrl}/invite`, {
            email,
            role,
        });
    }
}
