import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from 'src/services/poke-api.service';
import { SharedPokemonService } from 'src/services/shared-pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pokemon: any = {};
  constructor(private sharedPokemonService: SharedPokemonService) {}

    ngOnInit() {
      this.sharedPokemonService.pokemonList$.subscribe(pokemons => {
        console.log(pokemons);
        this.pokemon = pokemons;
      });
    }
}