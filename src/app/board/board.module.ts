import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { BoardRoutingModule } from './board-routing.module';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { BoardComponent } from './board.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageProjectsComponent,
    BoardComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class BoardModule { }
