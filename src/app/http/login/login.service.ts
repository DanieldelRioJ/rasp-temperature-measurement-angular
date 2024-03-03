import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { backUrl } from '../../../environments/environment';
import { tap } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _authService: AuthService,
    ) {}

    login(email: string, password: string) {
        return this._httpClient
            .post<LoginResponse>(`${backUrl}/login`, { email, password })
            .pipe(
                tap((response) => {
                    this._authService.user = response.data;
                    this._authService.token = response.token;
                }),
            );
    }

    requestPasswordChange(email: string) {
        return this._httpClient.post(`${backUrl}/request-password-change`, {
            email,
        });
    }

    changePassword(email: string, recoveryToken: string, newPassword: string) {
        return this._httpClient.post(`${backUrl}/change-password`, {
            email,
            recovery_token: recoveryToken,
            new_password: newPassword,
        });
    }
}

export interface LoginResponse {
    data: User;
    message: string;
    token: string;
}
