import {
    AfterViewInit,
    Component,
    effect,
    input,
    Input,
    ViewChild,
} from '@angular/core';
import { RegisteredSensor } from '../../../../../../shared/models/registered-sensor.model';
import { Measurement } from '../../../../../../http/devices/measurement.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-table-view',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatHeaderCellDef,
        MatCellDef,
        MatPaginator,
        MatSort,
        MatSortHeader,
        DatePipe,
        DecimalPipe,
    ],
    templateUrl: './table-view.component.html',
})
export class TableViewComponent implements AfterViewInit {
    @ViewChild(MatSort) matSort!: MatSort;
    @ViewChild(MatPaginator) matPaginator!: MatPaginator;
    @Input() device?: RegisteredSensor;
    measurements = input<Measurement[]>();
    datasource = new MatTableDataSource<Measurement>([]);
    displayedColumns: string[] = ['date', 'temperature'];

    constructor() {
        effect(() => {
            this.datasource.data = this.measurements() ?? [];
        });
    }

    ngAfterViewInit(): void {
        this.datasource.sort = this.matSort;
        this.datasource.paginator = this.matPaginator;
    }
}
