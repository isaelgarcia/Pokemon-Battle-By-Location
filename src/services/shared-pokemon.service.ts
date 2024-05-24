import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPokemonService {
  private pokemon1Source = new BehaviorSubject<any>(null);
  private pokemon2Source = new BehaviorSubject<any>(null);

  pokemon1$ = this.pokemon1Source.asObservable();
  pokemon2$ = this.pokemon2Source.asObservable();

  setPokemon1(pokemon: any) {
    this.pokemon1Source.next(pokemon);
  }

  setPokemon2(pokemon: any) {
    this.pokemon2Source.next(pokemon);
  }
}