import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { PersonasComponent } from './personas/personas.component';


const routes: Routes = [
  { path: '', component: EmpresasComponent},
  { path: 'personas', component: PersonasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
