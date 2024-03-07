import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    standalone: true,
    imports: [MatIcon],
})
export class NotificationComponent {
    type: 'success' | 'error';
    title: string;
    body: string;

    constructor(@Inject(MAT_SNACK_BAR_DATA) private _data: any) {
        this.type = _data.type;
        this.title = _data.title;
        this.body = _data.body;
    }
}
