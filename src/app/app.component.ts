import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatNativeDateModule],
    templateUrl: './app.component.html',
})
export class AppComponent {}
