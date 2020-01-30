import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateAdapter {
    fromModel(value: string): NgbDateStruct {
        if (!value) {
            return null;
        }
        const parts = value.split('/');
        // return {year: + parts[0], month: + parts[1], day: + parts[2] };
        return {year: + parts[2], month: + parts[1], day: + parts[0] };
    }

    // from internal model -> your mode
    toModel(date: NgbDateStruct): string {
        // return date ? date.year + '/' + ('0' + date.month).slice(-2) + '/' + ('0' + date.day).slice(-2) : null;
        return date ? ('0' + date.day).slice(-2) + '/' + ('0' + date.month).slice(-2) + '/' + date.year  : null;
    }
}