import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona-form';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }



  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${environment.apiUrl}/personas`);

  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${environment.apiUrl}/personas/${id}`);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${environment.apiUrl}/personas`, persona);
  }

  deletePersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${environment.apiUrl}/personas/${id}`);
  }

  updatePersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${environment.apiUrl}/personas/${id}`, persona);
  }
}
