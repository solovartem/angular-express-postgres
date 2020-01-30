import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { catchError, map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    return this.http.get( `${URL_SERVICIOS}/login/renuevatoken` )
                    .pipe(
                      map( (resp: any) => {
                        this.token = resp.token;
                        localStorage.setItem('token', this.token );
                        console.log('Token renovado');
                        return true;
                      }),
                      catchError(err => {
                        this.router.navigate(['/login']);
                        Swal.fire( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
                        return Observable.throw( err );
                      })
                    );
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    return this.http.post( `${URL_SERVICIOS}/login`, usuario )
                    .pipe(
                      map( (resp: any) => {
                        this.guardarStorage( resp.id, resp.token, resp.usuario );
                        return true;
                      })
                    );

  }


  crearUsuario( usuario: Usuario ) {
    return this.http.post( `${URL_SERVICIOS}/register`, usuario )
                    .pipe(
                      map( (resp: any) => {
                        Swal.fire('Usuario creado', usuario.email, 'success' );
                        return resp.user;
                      })
                    );
  }

  actualizarUsuario( usuario: Usuario ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.put( `${URL_SERVICIOS}/users/${usuario.id}`, usuario, { headers } )
                    .pipe(
                      map( (resp: any) => {
                        if ( usuario.id === this.usuario.id ) {
                          this.guardarStorage( usuario.id, this.token, usuario );
                        }
                        Swal.fire('Usuario actualizado', usuario.name, 'success' );
                        return true;
                      })
                    );

  }

  cargarUsuarios( id: any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.get( `${URL_SERVICIOS}/users/${id}`,  { headers })
                    .pipe(
                      map( (resp: any) => {
                        return resp.user;
                      })
                    )

  }

  borrarUsuario( id: string ) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });

    return this.http.delete( `${URL_SERVICIOS}/users/${id}`,  {headers} )
                    .pipe(
                      map( resp => {
                        Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                        return true;
                      })
                    );

  }

}
