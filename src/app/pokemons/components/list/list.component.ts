import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListService } from './list.service';
import { debounceTime } from 'rxjs/operators';
import { PaginatorState } from '../../../components/paginator/paginator.component';

@Component({
  selector: 'pokemon-list',
  template: `
    <ng-container *ngIf="(state$ | async) as state">
    <paginator
        [currentPage]="state.page"
        [rowsPerPageOptions]="[10, 20, 40, 80]"
        [rows]="state.perPage"
        [totalRecords]="state.totalRows"
        (onPageChange)="onPageChanged($event)"
      ></paginator>
      <input
        type="text"
        class="w-2/4 p-2 rounded border border-gray-600"
        placeholder="Filter by pokemon name..."
        [formControl]="query"
      />
      <app-table [isLoading]="state.isLoading" [data]="state.pokemons"></app-table>
    </ng-container>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListService],
})
export class ListComponent implements OnInit {
  query = new FormControl('');
  state$ = this.listService.state$;

  constructor(private listService: ListService) {
    this.query.valueChanges
      .pipe(debounceTime(500))
      .subscribe((query) => this.listService.setQuery(query));
  }

  ngOnInit() {
    this.listService.setState({});
  }

  onPageChanged({ page, rows, first }: PaginatorState) {
    this.listService.setState({ page, perPage: rows, offset: first - rows });
    this.query.setValue('');
  }
}
