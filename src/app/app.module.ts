import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotAthenticatedComponent } from './components/not-authenticated/not-authenticated.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'pokemons',
        pathMatch: 'full',
      },
      {
        path: 'pokemons',
        canLoad: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pokemons/pokemons.module').then((m) => m.PokemonModule),
      },
    ],
  },
  {
    path: 'not-auth',
    component: NotAthenticatedComponent,
  },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
  ],
  declarations: [AppComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
