import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Persona } from "../../interfaces/persona-form";
import { PersonaService } from "src/app/services/persona.service";
import { Router, ActivatedRoute } from "@angular/router"; 

@Component({
  selector: "app-persona",
  templateUrl: "./persona-form.component.html",
  styleUrls: ["./persona-form.component.css"],
})
export class PersonaComponent {
  personaData!: Persona;
  clasePersona: Persona = new Persona();
  interfacePersona: Persona = {
    id: 0,
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
  };
  persona: FormGroup;
  edit: boolean = false;
  constructor(private personaService: PersonaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.persona = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      fecha_nacimiento: new FormControl("", Validators.required),
    });

      // Obtener el ID de los parámetros de la URL
  const params = this.activatedRoute.snapshot.params;
  if (params && params['id']) {
    // Obtener la persona y guardarla para su uso posterior
    this.personaService.getPersona(params['id'])
      .subscribe(
        res => {
          this.personaData = res; // Guardar la referencia al objeto Persona
          this.persona.patchValue(res); // Inicializar el formulario con los valores
          this.edit = true;
        }
      );
  }

  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params && params['id']) {
      this.personaService.getPersona(params['id'])
      .subscribe(
        res => {
          console.log(res);
          const personaData = {
            nombre: res.nombre,
            apellido: res.apellido,
            fecha_nacimiento: res.fecha_nacimiento
          };
          this.persona.setValue(personaData);
          this.edit = true;
        }
      )
    }
  }

  submit() {
    this.personaService.createPersona(this.persona.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

update() { 
  if (this.personaData && this.personaData.id !== undefined) {
    this.personaService.updatePersona(this.personaData.id, this.persona.value)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/persona']);
        },
        err => console.log(err)
      );
  } else {
    console.error('No se pudo actualizar la persona: ID indefinido.');
  }
}

}
