import { Component, OnInit } from '@angular/core';
import { Projec } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.css']
})
export class PageProjectsComponent implements OnInit {

  projects:Projec[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.dataService.getProjects()
    .subscribe( projects => {
      this.projects = projects;

      //Obtener ciudad de el projecto
      const {city_id} = this.projects[0]

    })
  }

  getCity(id: string){
    this.dataService.getCity(id)
    .subscribe( city => console.log(city))
  }

}
