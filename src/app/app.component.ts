import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RaspberryConfigurationService } from './http/raspberry-configuration/raspberry-configuration.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatNativeDateModule],
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        private readonly _raspberryConfigurationService: RaspberryConfigurationService,
    ) {
        this._raspberryConfigurationService
            .getName()
            .pipe(takeUntilDestroyed())
            .subscribe();
    }
}
