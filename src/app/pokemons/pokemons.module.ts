import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorModule } from '../components/paginator/paginator.module';
import { TableModule } from '../components/table/table.module';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    PaginatorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DetailsComponent, ListComponent],
})
export class PokemonModule {}
