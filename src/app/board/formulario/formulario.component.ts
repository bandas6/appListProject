import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { City } from '../interfaces/interfaces';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit , OnChanges {

  faMinusSquare = faMinusSquare;
  faPlus = faPlus;

  cities: City[] = [];
  filterPost: any;
  ciudadesAr: any[] = [];

  nombreEmit: string = ''


  miFormulario: FormGroup = this.fb.group({
    nombre: [this.nombreEmit, [Validators.required]],
    descripcion: ['', [Validators.required]],
    city_id: ['', [Validators.required]],

  });

  constructor(private fb: FormBuilder,
    private dataService: DataService) {
    this.getCities();

  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.dataService.project
        .subscribe(dataPro => {
          const { nombre, descripcion, cities } = dataPro;
          this.nombreEmit = nombre;
        })
    }, 100)
  }


  ngOnInit(): void {

  }


  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  agregar() {

    this.campoEsValido('nombre');

    const { nombre, descripcion } = this.miFormulario.value;
    const stringCities = this.ciudadesAr.toString();

    const projecto = {
      nombre,
      descripcion,
      cities: stringCities
    }



    if (this.miFormulario.value['nombre'] && this.miFormulario.value['descripcion']) {

      this.dataService.postProject(projecto)
        .subscribe(resp => console.log(resp))
      return
    }
    console.log('campos vacios')
  }

  getCities() {
    this.dataService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      })
  }


  ciudadSeleccion() {
    if (this.filterPost) {
      this.ciudadesAr.push(this.filterPost)
    }
  }

  dataInput(item: any) {
    this.filterPost = item.ciudad
    if (this.filterPost) {
      this.ciudadesAr.push(item.ciudad)
    }
    setTimeout(() => {
      this.filterPost = ''
    }, 10)
  }



  eliminarSeleccion(item: string) {
  }

}
