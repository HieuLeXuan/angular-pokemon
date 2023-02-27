import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  of,
  ReplaySubject,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { PaginatedPokemon, Pokemon } from '../../../models/pokemon';
import { BackendService } from '../../../services/backend.service';

interface ListState {
  isLoading: boolean;
  page: number;
  perPage: number;
  offset: number;
  totalRows: number;
  query: string;
  pokemons: Pokemon[];
  orgPokemons: Pokemon[];
}

@Injectable()
export class ListService {
  state$: Observable<ListState>;
  private stateSubject = new ReplaySubject<ListState>(1);

  constructor(private backendService: BackendService) {
    this.state$ = this.stateSubject.asObservable().pipe(
      startWith({
        isLoading: false,
        page: 0,
        perPage: 20,
        offset: 0,
        totalRows: 0,
        query: '',
        pokemons: [],
        orgPokemons: [],
      })
    );
  }

  setState({
    page,
    perPage,
    offset,
  }: Partial<
    Omit<
      ListState,
      'isLoading' | 'pokemons' | 'totalRows' | 'query' | 'orgPokemons'
    >
  >): void {
    of(null)
      .pipe(
        withLatestFrom(this.state$),
        switchMap(([, state]) => {
          this.stateSubject.next({
            ...state,
            page: page || state.page,
            perPage: perPage || state.perPage,
            isLoading: true,
          });
          return this.backendService.getPokemons(perPage, offset).pipe(
            map(({ count, results }: PaginatedPokemon) => {
              this.stateSubject.next({
                ...state,
                page: page || state.page,
                perPage: perPage || state.perPage,
                isLoading: false,
                totalRows: count,
                pokemons: results,
                orgPokemons: results,
              });
              return of(null);
            })
          );
        })
      )
      .subscribe(() => {});
  }

  setQuery(query: string): void {
    of(null)
      .pipe(
        withLatestFrom(this.state$),
        switchMap(([, state]) => {
          this.stateSubject.next({
            ...state,
            pokemons: state.orgPokemons.filter((p) =>
              p.name.toLowerCase().includes(query.toLowerCase())
            ),
          });
          return of(null);
        })
      )
      .subscribe(() => {});
  }
}
