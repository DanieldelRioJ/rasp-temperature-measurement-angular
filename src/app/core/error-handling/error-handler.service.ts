import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
    constructor(private readonly _notificationService: NotificationService) {}

    error(httpErrorResponse: HttpErrorResponse) {
        if (httpErrorResponse?.error?.errors) {
            const error =
                httpErrorResponse.error.errors.length == 1
                    ? httpErrorResponse.error.errors[0]
                    : httpErrorResponse.error.errors;
            this._notificationService.send('Error', error, 'error');
        } else if (httpErrorResponse.status === HttpStatusCode.Forbidden) {
            this._notificationService.send(
                'Error',
                'Acceso prohibido',
                'error',
            );
        } else {
            this._notificationService.send(
                'Error',
                httpErrorResponse.error?.error ?? httpErrorResponse.message,
                'error',
                20000,
            );
        }
        console.log(httpErrorResponse);
    }
}
