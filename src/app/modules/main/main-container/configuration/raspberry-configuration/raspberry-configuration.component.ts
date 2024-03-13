import { Component, DestroyRef, inject } from '@angular/core';
import { FormErrorDirective } from '../../../../../shared/form-error/form-error.directive';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    MatChipGrid,
    MatChipInput,
    MatChipInputEvent,
    MatChipRemove,
    MatChipRow,
} from '@angular/material/chips';

@Component({
    selector: 'app-raspberry-configuration',
    standalone: true,
    imports: [
        FormErrorDirective,
        MatButton,
        MatError,
        MatFormField,
        MatIcon,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatChipRemove,
    ],
    templateUrl: './raspberry-configuration.component.html',
})
export class RaspberryConfigurationComponent {
    emails = ['angular@g.com'];
    private _destroyRef = inject(DestroyRef);

    raspberryConfigurationForm = this._formBuilder.nonNullable.group({
        name: new FormControl<string>('', [Validators.required]),
    });
    formControl: FormControl = new FormControl<string>('', [Validators.email]);

    constructor(private readonly _formBuilder: FormBuilder) {}

    changeAppName() {}

    removeEmail(keyword: string) {
        const index = this.emails.indexOf(keyword);
        if (index >= 0) {
            this.emails.splice(index, 1);
        }
    }

    addEmail(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our keyword
        if (value && this.formControl.valid) {
            this.emails.push(value);
            // Clear the input value
            event.chipInput!.clear();
        }
    }
}
