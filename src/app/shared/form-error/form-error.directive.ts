import {
    AfterViewInit,
    DestroyRef,
    Directive,
    inject,
    Injector,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, combineLatest, filter, startWith } from 'rxjs';
import {
    MatFormField,
    MatFormFieldControl,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
    selector: '[appFormError]',
    standalone: true,
})
export class FormErrorDirective implements AfterViewInit {
    private _fieldNameChangedSubject = new BehaviorSubject<string>('');
    private _fieldNameChanged$ = this._fieldNameChangedSubject.asObservable();
    private inputRef!: MatFormFieldControl<MatInput>;
    private _destroyRef = inject(DestroyRef);

    @Input() set appFormErrorFrom(fieldName: string) {
        this._fieldNameChangedSubject.next(fieldName);
    }

    constructor(
        private readonly _inj: Injector,
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainerRef: ViewContainerRef,
    ) {}

    public ngAfterViewInit(): void {
        // grab reference to MatFormField directive, where form control is accessible.
        const container = this._inj.get(MatFormField);
        this.inputRef = container._control;

        // sub to the control's status stream
        combineLatest([
            this.inputRef!.ngControl!.statusChanges!.pipe(
                startWith(this.inputRef?.ngControl!.status),
            ),
            this._fieldNameChanged$.pipe(
                filter((fieldName) => fieldName != null),
            ),
        ])
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(this.updateErrors);
    }

    private updateErrors = ([state, fieldName]: [
        'VALID' | 'INVALID',
        string,
    ]): void => {
        this.viewContainerRef.clear();
        if (state === 'INVALID') {
            // active errors on the FormControl
            const controlErrors = this.inputRef.ngControl!.errors;

            // just grab one error
            Object.entries(controlErrors!).forEach(([error, errorValue]) => {
                if (error === 'required') {
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit: `El campo "${fieldName}" es obligatorio`,
                    });
                }

                if (error === 'minlength') {
                    errorValue[''];
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit:
                            `El campo "${fieldName}" debe tener longitud mínima ` +
                            errorValue.requiredLength,
                    });
                }
                if (error === 'maxlength') {
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit:
                            `El campo "${fieldName}" debe tener longitud máxima ` +
                            errorValue.requiredLength,
                    });
                }
                if (error === 'min') {
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit:
                            `El campo "${fieldName}" debe tener valor mínimo ` +
                            errorValue.min,
                    });
                }

                if (error === 'max') {
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit:
                            `El campo "${fieldName}" debe tener valor mínimo ` +
                            errorValue.max,
                    });
                }
                if (error === 'email') {
                    this.viewContainerRef.createEmbeddedView(this.templateRef, {
                        $implicit: `El campo "${fieldName}" debe tener formato email`,
                    });
                }
            });
        }
    };
}
