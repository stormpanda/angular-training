import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  heroes$!: Observable<Hero[]>;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map(heroes => heroes.slice(1, 5))
    )
  }
}
