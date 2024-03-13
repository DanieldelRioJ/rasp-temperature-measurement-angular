import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class SensorDataFormService {
    today = new Date();
    yesterday = new Date(new Date().setDate(this.today.getDate() - 1));

    range = this._formBuilder.group({
        start: new FormControl<Date>(this.yesterday, [Validators.required]),
        end: new FormControl<Date>(this.today, [Validators.required]),
    });

    constructor(private readonly _formBuilder: FormBuilder) {}
}
