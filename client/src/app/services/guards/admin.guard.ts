import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  canActivate() {

    if ( true ) {
      return true;
    }else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      this._usuarioService.logout();
      return false;
    }

  }

}
