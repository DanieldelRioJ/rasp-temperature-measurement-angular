import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../environments/environment';
import { AuthService } from '../core/services/auth.service';
import { tap } from 'rxjs';
import { LoginResponse } from './login/login.service';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _authService: AuthService,
    ) {}

    register(email: string, token: string, password: string) {
        return this._httpClient
            .post<LoginResponse>(`${backUrl}/register`, {
                email,
                token,
                password,
            })
            .pipe(
                tap((response) => {
                    this._authService.user.set(response.data);
                    this._authService.token = response.token;
                }),
            );
    }

    invite(email: string, role: string) {
        return this._httpClient.post(`${backUrl}/invite`, {
            email,
            role,
        });
    }
}
