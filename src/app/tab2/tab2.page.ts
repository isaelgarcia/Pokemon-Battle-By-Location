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
  pokemon1Source: any = null;
  pokemon2Source: any = null;
  resultado: string = '';

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private sharedPokemonService: SharedPokemonService
  ) {}

  ngOnInit() {
    this.sharedPokemonService.pokemon1$.subscribe(data => {
      this.pokemon2Source = data;
      this.fetchRandomPokemon();
    });
  }

  fetchRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 100) + 1;
    this.pokeAPIService.getPokeAPIService(pokemonId).subscribe(data => {
      this.pokemon1Source = data;
      this.sharedPokemonService.setPokemon2(data); // Armazena o Pokémon no serviço compartilhado
      this.comparePokemons();
    });
  }

  comparePokemons() {
    if (this.pokemon2Source && this.pokemon1Source) {
      const abilities1 = this.pokemon2Source.abilities.length;
      const abilities2 = this.pokemon1Source.abilities.length;

      if (abilities1 === abilities2) {
        this.resultado = 'Empate';
        this.sharedPokemonService.incrementDraw(this.pokemon2Source.id);
      } else if (abilities1 > abilities2) {
        this.resultado = 'Ganhou';
        this.sharedPokemonService.incrementVictory(this.pokemon2Source.id);
      } else {
        this.resultado = 'Perdeu';
        this.sharedPokemonService.incrementDefeat(this.pokemon2Source.id);
      }
    }
  }

  get pokemonImageUrl() {
    if (this.pokemon1Source) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon1Source.id}.png`;
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

//hi