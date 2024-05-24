import { Component } from '@angular/core';
import { PhotoService } from 'src/services/photo.service';
import { PokeAPIService } from 'src/services/poke-api.service';
import { SharedPokemonService } from 'src/services/shared-pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemonData: any = null;
  pokemon1Data: any = null;
  resultado: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private sharedPokemonService: SharedPokemonService
  ) {}

  ngOnInit() {
    this.sharedPokemonService.pokemon1$.subscribe(data => {
      this.pokemon1Data = data;
      this.fetchRandomPokemon();
    });
  }

  fetchRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(pokemonId).subscribe(data => {
      this.pokemonData = data;
      this.sharedPokemonService.setPokemon2(data); // Armazena o Pokémon no serviço compartilhado
      this.comparePokemons();
    });
  }

  comparePokemons() {
    if (this.pokemon1Data && this.pokemonData) {
      const abilities1 = this.pokemon1Data.abilities.length;
      const abilities2 = this.pokemonData.abilities.length;

      if (abilities1 === abilities2) {
        this.resultado = 'Empate';
      } else if (abilities1 > abilities2) {
        this.resultado = 'Perdeu';
      } else {
        this.resultado = 'Ganhou';
      }
    }
  }

  get pokemonImageUrl() {
    if (this.pokemonData) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonData.id}.png`;
    }
    return ''; 
  }

  get resultadoColor() {
    switch (this.resultado) {
      case 'Empate':
        return 'yellow';
      case 'Ganhou':
        return 'red';
      case 'Perdeu':
        return 'green';
      default:
        return '';
    }
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
}