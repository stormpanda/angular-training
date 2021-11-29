import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.loadHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(() => this.heroService.loadHeroes());
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(() => this.heroService.loadHeroes());
  }
}
