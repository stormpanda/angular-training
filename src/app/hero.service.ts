import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  updateHero(hero: Hero): Observable<void> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put<void>(url, hero, this.httpOptions).pipe(
      tap(() => this.log(`update hero id=${hero.id}`)),
      catchError(() => {
        this.log(`error updating hero id=${hero.id}`);
        return of(undefined)
      })
    );
  }

  addHero(hero: Hero): Observable<Hero | undefined> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(() => {
        this.log(`error adding hero name=${hero.name}`);
        return of(undefined)
      })
    );
  }

  deleteHero(id: number): Observable<Hero | undefined> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(() => {
        this.log(`error deleting hero id=${id}`);
        return of(undefined)
      })
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return of([]);
    
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name_like=${trimmedTerm}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${trimmedTerm}"`) :
        this.log(`no heroes matching "${trimmedTerm}"`)),
      catchError(() => {
        this.log(`error searching heroes matching "${trimmedTerm}"`);
        return of([])
      })
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
