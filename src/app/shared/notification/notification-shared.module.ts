import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    imports: [MatSnackBarModule, NotificationComponent],
    providers: [NotificationService],
    exports: [],
})
export class NotificationSharedModule {}
