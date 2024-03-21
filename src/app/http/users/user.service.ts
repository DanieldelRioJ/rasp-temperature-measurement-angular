import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backUrl } from '../../../environments/environment';

export interface User {
    id: number;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly _httpClient: HttpClient) {}

    getUsers() {
        return this._httpClient.get<User[]>(`${backUrl}/users`);
    }

    changeRole(user: User, role: string) {
        return this._httpClient.get<User[]>(
            `${backUrl}/users/${user.id}/role/${role}`,
        );
    }
}
