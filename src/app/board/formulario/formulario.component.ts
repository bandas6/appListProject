import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { City } from '../interfaces/interfaces';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  cities:City [] = [];

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    city_id: ['', [Validators.required]],

  });

  constructor(private fb: FormBuilder,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getCities();
  }


  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  agregar() {
    const {nombre , descripcion , city_id} = this.miFormulario.value;
    const projecto = {
      nombre,
      descripcion
    }
    if(this.miFormulario.value['nombre']){

      this.dataService.postProject(projecto,city_id)
      .subscribe(resp => console.log(resp))
      return
    }
    console.log('campos vacios')
  }

  getCities(){
    this.dataService.getCities()
    .subscribe( cities => {
      this.cities = cities;
    })
  }

}
