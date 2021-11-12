import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, Observable, switchMap } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.hero$ = this.route.params.pipe(
      switchMap(params => this.heroService.getHero(params['id'])),
      filter(Boolean)
    );
  }

  save(hero: Hero): void {
    if (!hero) return;
    this.heroService.updateHero(hero).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
