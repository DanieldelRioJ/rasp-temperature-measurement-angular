import { Component, DestroyRef, inject } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddSensorComponent } from './add-sensor/add-sensor.component';
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Subject } from 'rxjs';

@Component({
    selector: 'app-main-container',
    standalone: true,
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatButton,
        MatIcon,
        SensorDataComponent,
    ],
    templateUrl: './main-container.component.html',
})
export class MainContainerComponent {
    private _destroyRef = inject(DestroyRef);
    reload$ = new Subject<void>();

    constructor(private readonly _matDialog: MatDialog) {}

    addSensor() {
        this._matDialog
            .open(AddSensorComponent, {
                width: '400px',
            })
            .afterOpened()
            .pipe(
                filter((result) => result != null),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe(() => {
                this.reload$.next();
            });
    }
}
