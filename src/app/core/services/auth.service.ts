import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    storage = localStorage;
    user?: User;

    constructor() {}

    set token(token: string | null) {
        if (token == null) {
            this.storage.removeItem('token');
        } else {
            this.storage.setItem('token', token);
        }
    }

    get token(): string | null {
        return this.storage.getItem('token');
    }
}
