import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Evento } from '../../models/evento.model';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EventoService {
  
  headers;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this._usuarioService.token
    });
  }

  cargarEventos() {
    return this.http.get( `${URL_SERVICIOS}/events`, { headers: this.headers } )
                    .pipe(
                      map( resp => resp )
                    );
  }

  obtenerEvento( id: string ) {
    return this.http.get( `${URL_SERVICIOS}/events/${id}`, { headers: this.headers } )
                    .pipe(
                      map( (resp: any) => resp.event )
                    );

  }

  borrarEvento( id: string ) {
    return this.http.delete( `${URL_SERVICIOS}/events/${id}`, { headers: this.headers } )
                    .pipe(
                      map( resp => Swal.fire('Evento Borrado', 'Eliminado correctamente', 'success') )
                    );
  }

  guardarEvento( evento: Evento ) {
    if (evento.id !== null) {
      return this.http.put( `${URL_SERVICIOS}/events/${evento.id}`, evento, { headers: this.headers } )
                    .pipe(
                      map( resp => Swal.fire('Evento Actualiado', evento.name, 'success') )
                    );
    } else {
      return this.http.post( `${URL_SERVICIOS}/events`, evento, { headers: this.headers } )
                      .pipe(
                        map( (resp: any) => Swal.fire('Evento Creado', resp.event.name, 'success') )
                      );
    }
  }

}
