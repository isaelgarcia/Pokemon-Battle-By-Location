import { Component } from '@angular/core';
import { PokeAPIService } from 'src/services/poke-api.service';
import { ViaCEPService } from 'src/services/via-cep.service';
import { SharedPokemonService } from 'src/services/shared-pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemonData: any = null;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedPokemonService: SharedPokemonService
  ) {}
  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) =>{
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value)) ["bairro"];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
      this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
    });
    const pokemonId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(pokemonId).subscribe(data => {
      this.pokemonData = data;
      this.sharedPokemonService.setPokemon1(data);
    });
  }
  get pokemonImageUrl() {
    if (this.pokemonData) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonData.id}.png`;
    }
    return '';
  }
}
