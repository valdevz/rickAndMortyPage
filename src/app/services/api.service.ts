import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseURL: string = "https://rickandmortyapi.com/api/";

  constructor(private http: HttpClient) { }

    getCharacters(): Observable<any>{
      return this.http.get(this.baseURL + 'character');
    }

    getIndividualCharacter(id : number): Observable<any> {
      if(typeof id == 'number') return this.http.get(`${this.baseURL}character/${id}`);
      else return throwError(() => 'Bad request')
    }

    getMultipleCharacters(ids: string): Observable<any> {
      return this.http.get(this.baseURL + 'character/' + ids);
    }

    getLocations(){
      return this.http.get(this.baseURL + 'location');
    }
    getEpisodes(){
      return this.http.get(this.baseURL + 'episode');
    }

}
