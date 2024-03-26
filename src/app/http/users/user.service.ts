import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';
import { tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LoginResponse } from '../login/login.service';

export interface User {
    id: number;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _authService: AuthService,
    ) {}

    getUsers() {
        return this._httpClient.get<User[]>(`${backUrl}/users`);
    }

    changeRole(user: User, role: string) {
        return this._httpClient.post(
            `${backUrl}/users/${user.id}/role/${role}`,
            null,
        );
    }

    changeEmailOrPassword(newProperties: {
        new_email: string;
        new_password: string;
    }) {
        return this._httpClient
            .post<LoginResponse>(
                `${backUrl}/change-email-password`,
                newProperties,
            )
            .pipe(
                tap((response) => {
                    this._authService.user.set(response.data);
                    this._authService.token = response.token;
                }),
            );
    }

    deleteUser(user: User) {
        return this._httpClient.delete(`${backUrl}/users/${user.id}`);
    }
}
