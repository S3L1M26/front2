import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaListComponent } from './components/persona-list/persona-list.component';
import { PersonaComponent } from './components/persona-form/persona-form.component';

const routes: Routes = [
  { path: '', component: PersonaListComponent },
  { path: 'persona', component: PersonaListComponent },
  { path: 'persona/create', component: PersonaComponent },
  { path: 'persona/edit/:id', component: PersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
