import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

class DialogoConfirmacionComponent {}

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
    templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
    constructor(
        public dialog: MatDialogRef<DialogoConfirmacionComponent>,
        @Inject(MAT_DIALOG_DATA) public message: string,
    ) {}

    closeDialog(): void {
        this.dialog.close(false);
    }

    confirm(): void {
        this.dialog.close(true);
    }
}
