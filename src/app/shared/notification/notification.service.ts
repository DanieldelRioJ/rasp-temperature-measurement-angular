import {Injectable} from '@angular/core';
import {NotificationComponent} from './notification.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

/**
 * Notification service
 */
@Injectable()
export class NotificationService {
    private _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private _verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private _snackBar: MatSnackBar) {}

    /**
     *
     * @param titleText Title of the notification translated
     * @param bodyText Body of the notification translated
     * @param type Type of the notification
     | 'primary'
     | 'accent'
     | 'warn'
     | 'basic'
     | 'info'
     | 'success'
     | 'warning'
     | 'error'
     * @param duration Duration in miliseconds
     */
    send(
        titleText: string,
        bodyText: string | null,
        type: string,
        duration = 3000,
    ): void {
        this._notifify(titleText, bodyText, type, duration, [
            'p-px',
            'bg-transparent',
            'transparent-snackbar',
            'border-0',
        ]);
    }

    private _notifify(
        titleText: string,
        bodyText: string | null,
        type: string,
        duration: number,
        panelClasses: string[],
    ): void {
        this._snackBar.openFromComponent(NotificationComponent, {
            duration: duration,
            horizontalPosition: this._horizontalPosition,
            verticalPosition: this._verticalPosition,
            panelClass: panelClasses,
            data: {
                type: type,
                title: titleText,
                body: bodyText,
            },
        });
    }
}
