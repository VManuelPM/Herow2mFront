import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HeroesModel } from '../models/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {

  private BASE_URL: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<HeroesModel[]>{
    return this.http.get<HeroesModel[]>(`${this.BASE_URL}/heroes`).pipe(
      catchError(this.handleError)
    );
  }

  getHeroe(idHeroe: number): Observable<HeroesModel>{
    return this.http.get<HeroesModel>(`${this.BASE_URL}/heroes/${idHeroe}`).pipe(
      catchError(this.handleError)
    );
  }

  getHeroeLike(dataSource: MatTableDataSource<HeroesModel>, parameter: string){
    return dataSource.filter = parameter.trim().toLowerCase();
  }

  saveHeroe(heroe: HeroesModel): Observable<HeroesModel>{
    return this.http.post<HeroesModel>(`${this.BASE_URL}/heroes`, heroe).pipe(
      catchError(this.handleError)
    )
  }

  updateHeroe(heroe: HeroesModel): Observable<HeroesModel>{
    return this.http.put<HeroesModel>(`${this.BASE_URL}/heroes/${heroe.id}`, heroe).pipe(
      catchError(this.handleError)
    )
  }

  deleteHeroe(idHeroe: number) {
    return this.http.delete<any>(`${this.BASE_URL}/heroes/${idHeroe}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    const msg =
      'Error status code' + error.status + 'status' + error.statusText;
    return throwError(msg);
  }
}
