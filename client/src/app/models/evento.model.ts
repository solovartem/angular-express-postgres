export class Evento {

    constructor (
        public name: string,
        public categorie: string,
        public place: string,
        public address: string,
        public date_start: string,
        public date_end: string,
        public type_event: string,
        public id?: string
    ) { }

}
