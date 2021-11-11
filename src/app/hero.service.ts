import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly apiRoot = 'http://localhost:3000';
  private readonly heroesUrl = `${this.apiRoot}/heroes`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(() => {
        this.log('error fetching heroes');
        return of([])
      })
    );
  }

  getHero(id: number): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(() => {
        this.log(`error fetching hero id=${id}`);
        return of(undefined)
      })
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
