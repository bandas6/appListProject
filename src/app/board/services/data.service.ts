import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Projec, City } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  @Output() project: EventEmitter<any> = new EventEmitter();


  urlProject:string = environment.urlPr;
  urlCities:string = environment.urlCt;
  constructor(private httpClient: HttpClient) {}

  getProjects(){
    return this.httpClient.get<Projec[] | any>(this.urlProject)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  .pipe( map( data => data['projects']))
  }

  postProject(project:Projec){
    return this.httpClient.post<Projec[] | any>(this.urlProject,project)
    // eslint-disable-next-line @typescript-eslint/dot-notation
    .pipe( map( data => data['projects']))
  }


  getCity(id: string){
    return this.httpClient.get<City[] | any>(this.urlCities + '/' + id )
  // eslint-disable-next-line @typescript-eslint/dot-notation
  .pipe( map( data => data))
  }


  getCities(){
    return this.httpClient.get<City[] | any>(this.urlCities)
  // eslint-disable-next-line @typescript-eslint/dot-notation
  .pipe( map( data => data['cities']))
  }

}
