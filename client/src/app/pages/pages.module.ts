
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventoComponent } from './dashboard/evento.component';
import { CustomDateAdapter } from '../helpers/customDateAdapter';
import { CustomDateParserFormatter } from '../helpers/customDateParserFormatter';

@NgModule({
    declarations: [
        DashboardComponent,
        EventoComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {provide: NgbDateAdapter, useClass: CustomDateAdapter},
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ],
    entryComponents: [
        EventoComponent
    ]
})
export class PagesModule { }
