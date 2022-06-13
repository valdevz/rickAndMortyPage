import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      {
        path: 'characters',
        loadChildren: ()=> import('./modules/characters/characters.module').then(m => m.CharactersModule)
      },
      {
        path: 'episodes',
        loadChildren: ()=> import('./modules/episodes/episodes.module').then(m => m.EpisodesModule)
      },
      {
        path: 'locations',
        loadChildren: ()=> import('./modules/locations/locations.module').then(m => m.LocationsModule)
      },
      {path: '**', redirectTo: 'characters' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
