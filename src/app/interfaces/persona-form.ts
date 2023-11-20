export interface Persona {
    id?:number;
    nombre:string;
    apellido:string;
    fecha_nacimiento:string;
}
export class Persona {
    id?: number;
    nombre: string = "";
    apellido: string = "";
    fecha_nacimiento: string = "";
  }