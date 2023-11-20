import { Component, OnInit } from '@angular/core';

import { PersonaService } from 'src/app/services/persona.service';

import { Persona } from 'src/app/interfaces/persona-form';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas() {
    this.personaService.getPersonas()
      .subscribe(
        res => {
          this.personas = res;
        },
        err => console.log(err)
      )
  }

  deletePersona(id: number | undefined) {
    if (id !== undefined) {
      this.personaService.deletePersona(id)
        .subscribe(
          res => {
            this.getPersonas();
          },
          err => console.log(err)
        );
    } else {
      console.log('El ID de la persona es undefined.');
    }
  }
}
