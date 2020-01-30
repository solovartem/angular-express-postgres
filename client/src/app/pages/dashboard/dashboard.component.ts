import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento.model';
import { EventoService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoComponent } from './evento.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  events: Array<Evento> = [];

  constructor(
    private eventoService: EventoService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventoService.cargarEventos().subscribe((data: Array<Evento>) => {
      this.events = data;
    });
  }

  openFormModal(id) {
    const modalRef = this.modalService.open(EventoComponent, { size: 'lg', centered: true});
    modalRef.componentInstance.id = id; // should be the id

    modalRef.result.then((result) => {
      console.log(result);
      this.loadEvents();
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteEvent(id) {
    Swal.fire({
      title: 'Estás seguro?',
      text: '¡No podrás revertir esto!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        this.eventoService.borrarEvento(id)
                          .subscribe( response => this.loadEvents() );
      }
    })
  }

}
