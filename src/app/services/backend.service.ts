import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PaginatedPokemon,
  PokemonDetail,
  SimplifiedPokemon,
} from '../models/pokemon';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly httpClient: HttpClient) {}

  getPokemons(limit = 20, offset = 0): Observable<PaginatedPokemon> {
    return this.httpClient
      .get(this.baseUrl, {
        params: { limit, offset },
      })
      .pipe(
        delay(1500),
        map((paginatedPokemon: PaginatedPokemon) => {
          return {
            ...paginatedPokemon,
            results: paginatedPokemon.results.map((pokemon) => ({
              ...pokemon,
              id: pokemon.url.split('/').filter(Boolean).pop(),
            })),
          };
        })
      );
  }

  getPokemonDetails(id: String): Observable<SimplifiedPokemon> {
    return this.httpClient.get(`${this.baseUrl}/${id}`).pipe(
      delay(1500),
      map((pokemon: PokemonDetail) =>
        BackendService.getSimplifiedPokemon(pokemon)
      )
    );
  }

  private static getSimplifiedPokemon(
    pokemon: PokemonDetail
  ): SimplifiedPokemon {
    return {
      name: '',
      ability: '',
      hiddenAbility: '',
      image: '',
      stats: [],
      type: '',
    };
  }
}
