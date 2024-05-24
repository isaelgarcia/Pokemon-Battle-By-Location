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
  private pokemonList = new BehaviorSubject<any[]>([]);
  pokemonList$ = this.pokemonList.asObservable();

  setPokemon1(pokemon: any) {
    this.pokemon1Source.next(pokemon);
  }

  setPokemon2(pokemon: any) {
    this.pokemon2Source.next(pokemon);
  }
  
  addPokemon(pokemon: any) {
    const currentList = this.pokemonList.value;
    this.pokemonList.next([...currentList, pokemon]);
  }

  updatePokemon(updatedPokemon: any) {
    const currentList = this.pokemonList.value.map(pokemon => 
      pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
    );
    this.pokemonList.next(currentList);
  }

  incrementVictory(pokemonId: number) {
    const updatedList = this.pokemonList.value.map(pokemon => {
      if (pokemon.id === pokemonId) {
        return { ...pokemon, victories: (pokemon.victories || 0) + 1 };
      }
      return pokemon;
    });
    this.pokemonList.next(updatedList);
  }

  incrementDefeat(pokemonId: number) {
    const updatedList = this.pokemonList.value.map(pokemon => {
      if (pokemon.id === pokemonId) {
        return { ...pokemon, defeats: (pokemon.defeats || 0) + 1 };
      }
      return pokemon;
    });
    this.pokemonList.next(updatedList);
  }

  incrementDraw(pokemonId: number) {
    const updatedList = this.pokemonList.value.map(pokemon => {
      if (pokemon.id === pokemonId) {
        return { ...pokemon, draws: (pokemon.draws || 0) + 1 };
      }
      return pokemon;
    });
    this.pokemonList.next(updatedList);
  }

}