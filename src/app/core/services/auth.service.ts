import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    storage = localStorage;
    user = signal<User | null>(null);

    constructor(private readonly _router: Router) {
        const token = this.storage.getItem('token');
        if (token) {
            try {
                this.user.set(jwtDecode(token));
            } catch (Error) {}
        }
    }

    set token(token: string | null) {
        if (token == null) {
            this.storage.removeItem('token');
        } else {
            this.storage.setItem('token', token);
            try {
                this.user.set(jwtDecode(token));
            } catch (Error) {}
        }
    }

    get token(): string | null {
        return this.storage.getItem('token');
    }

    logout() {
        this.token = null;
        this.user.set(null);
        this._router.navigateByUrl('/login');
    }
}
