import { Component } from '@angular/core';
import { FormErrorDirective } from '../../../../../shared/form-error/form-error.directive';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { ManageUsersListComponent } from './manage-users-list/manage-users-list.component';
import { MatTable } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-manage-users',
    standalone: true,
    imports: [
        FormErrorDirective,
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatSelect,
        MatOption,
        ManageUsersListComponent,
        MatTable,
        MatProgressSpinner,
    ],
    templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent {}
