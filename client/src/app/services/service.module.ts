import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  UsuarioService,
  EventoService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    UsuarioService,
    EventoService
  ],
  declarations: []
})
export class ServiceModule { }
