import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
    selector: 'app-main-container',
    standalone: true,
    imports: [MatToolbar, MatToolbarRow],
    templateUrl: './main-container.component.html',
})
export class MainContainerComponent {}
