import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoService } from '../../services/service.index';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styles: []
})
export class EventoComponent implements OnInit {

  @Input()id: String;
  eventForm: FormGroup;
  isLoading: Boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.id);
    if ( this.id !== 'nuevo' ) {
      this.loadEvent( this.id );
    }
  }

  createForm() {
    this.eventForm = this.formBuilder.group({
      id: [null],
      name: [''],
      categorie: [''],
      place: [''],
      address: [''],
      date_start: [''],
      date_end: [''],
      type_event: ['']
    });
  }

  loadEvent(id) {
    this.eventoService.obtenerEvento(id)
                      .subscribe((data: Evento) => this.eventForm.setValue(data) );
  }

  onSubmit(): void {
    this.isLoading = true;
    const dataForm = this.eventForm.value;
    this.eventoService.guardarEvento(dataForm)
                      .subscribe( (success) => {
                        if (success) {
                          this.isLoading = false;
                          this.activeModal.close(dataForm);
                        } else {
                          this.isLoading = false;
                        }
                      });

  }

}
